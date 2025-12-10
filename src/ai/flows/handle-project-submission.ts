
'use server';

/**
 * @fileOverview A server-side function to handle a correct project submission.
 * It atomically updates user progress and triggers a new learning recommendation.
 *
 * - handleProjectSubmission - A function that handles the transactional update.
 * - HandleProjectSubmissionInput - The input type for the function.
 * - HandleProjectSubmissionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, runTransaction, doc, increment, arrayUnion, updateDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { personalizedLearningRecommendation } from './personalized-learning-recommendation';
import { courses, projects } from '@/lib/data';
import { format } from 'date-fns';

const HandleProjectSubmissionInputSchema = z.object({
  userId: z.string().describe('The ID of the user whose progress is to be updated.'),
  projectId: z.string().describe('The ID of the project the user has just solved.'),
});
export type HandleProjectSubmissionInput = z.infer<typeof HandleProjectSubmissionInputSchema>;

const HandleProjectSubmissionOutputSchema = z.object({
  updated: z.boolean().describe('Whether the user profile was newly updated for this project (i.e., if this was the first time they solved this specific project).'),
  recommendation: z.string().optional().describe('The new learning recommendation if the profile was updated.'),
});
export type HandleProjectSubmissionOutput = z.infer<typeof HandleProjectSubmissionOutputSchema>;


export const handleProjectSubmission = ai.defineFlow(
  {
    name: 'handleProjectSubmission',
    inputSchema: HandleProjectSubmissionInputSchema,
    outputSchema: HandleProjectSubmissionOutputSchema,
  },
  async ({ userId, projectId }) => {
    const { firestore } = initializeFirebase();
    const userProfileRef = doc(firestore, 'users', userId, 'userProfiles', userId);

    try {
      const transactionResult = await runTransaction(firestore, async (transaction) => {
        const userProfileSnap = await transaction.get(userProfileRef);

        if (!userProfileSnap.exists()) {
          throw new Error("User profile not found.");
        }

        const userProfile = userProfileSnap.data();
        const solvedProjectIds: string[] = userProfile.solvedProjectIds || [];
        const alreadySolved = solvedProjectIds.includes(projectId);
        
        const today = format(new Date(), 'yyyy-MM-dd');

        // Always increment the total submissions count
        transaction.update(userProfileRef, {
            totalSubmissions: increment(1),
        });

        if (alreadySolved) {
          // If already solved, do nothing else and indicate no new update for this specific project.
          return { updated: false, profile: userProfile };
        }
        
        // If not already solved, perform the additional updates within the transaction.
        transaction.update(userProfileRef, {
          solvedProjects: increment(1),
          solvedProjectIds: arrayUnion(projectId),
          projectCompletionLog: arrayUnion(today),
        });
        
        // The profile was updated. Return the profile data needed for the next step.
        // We manually reflect the increment for the subsequent AI call.
        const updatedProfileForRecommendation = {
            ...userProfile,
            solvedProjects: (userProfile.solvedProjects || 0) + 1,
        };

        return { 
          updated: true, 
          profile: updatedProfileForRecommendation 
        };
      });

      // Step 2: If the transaction resulted in a new project being solved, generate and save the new recommendation.
      if (transactionResult.updated && transactionResult.profile) {
        const profile = transactionResult.profile;
        const recommendationInput = {
            userName: profile.name,
            coursesCompleted: profile.coursesCompleted || 0,
            solvedProjects: profile.solvedProjects,
            quizPerformance: 'Not yet tracked', // Placeholder
            availableCourses: courses.map(c => c.title),
            availableProjects: projects.map(p => p.title),
        };
        const recommendationResult = await personalizedLearningRecommendation(recommendationInput);
        
        // Update profile with new recommendation (non-transactional, as it's less critical)
        await updateDoc(userProfileRef, {
            lastRecommendation: recommendationResult.recommendation,
        });

        return { updated: true, recommendation: recommendationResult.recommendation };
      }

      // If no new project was solved, just return that it wasn't a new update.
      return { updated: false };

    } catch (error: any) {
      console.error("Transaction or recommendation flow failed: ", error);
      // Re-throw or handle as needed. For the flow, we can just let it fail.
      throw new Error(`Failed to update user progress: ${error.message}`);
    }
  }
);
