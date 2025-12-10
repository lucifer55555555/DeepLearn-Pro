'use client';

import { notFound } from 'next/navigation';
import { courses, learningTopics, projects } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { MarkdownRenderer } from '@/components/common/markdown-renderer';
import { Card } from '@/components/ui/card';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, increment, arrayUnion, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { personalizedLearningRecommendation } from '@/ai/flows/personalized-learning-recommendation';
import { useDoc } from '@/firebase/firestore/use-doc';
import { format } from 'date-fns';

type Props = {
  params: { slug: string };
};

export default function CoursePage({ params }: Props) {
  const { slug } = params;
  const course = courses.find((c) => c.id === slug);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid, 'userProfiles', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile } = useDoc(userProfileRef);

  if (!course) {
    notFound();
  }

  const topic = learningTopics.find((t) => t.slug === course.topic);

  const isAlreadyCompleted = userProfile?.completedCourseIds?.includes(course.id);

  const handleCompleteCourse = async () => {
    if (!user || !userProfile || !userProfileRef) {
      toast({
        variant: 'destructive',
        title: 'Not logged in',
        description: 'You need to be logged in to mark a course as complete.',
      });
      return;
    }
    
    if (userProfile.completedCourseIds?.includes(course.id)) {
        toast({
            title: 'Already Completed',
            description: `You have already completed ${course.title}.`,
        });
        return;
    }

    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      await updateDoc(userProfileRef, {
        coursesCompleted: increment(1),
        courseCompletionLog: arrayUnion(today),
        completedCourseIds: arrayUnion(course.id),
        activityLog: arrayUnion(today), // Add this line to log general activity
      });

      toast({
        title: 'Course Completed!',
        description: `You've completed ${course.title}.`,
      });

      // Trigger recommendation flow
      const recommendationInput = {
        userName: userProfile.name,
        coursesCompleted: (userProfile.coursesCompleted || 0) + 1,
        solvedProjects: userProfile.solvedProjects || 0,
        quizPerformance: 'Not yet tracked', // Placeholder
        availableCourses: courses.map(c => c.title),
        availableProjects: projects.map(p => p.title),
      };

      const recommendationResult = await personalizedLearningRecommendation(recommendationInput);
      
      await updateDoc(userProfileRef, {
        lastRecommendation: recommendationResult.recommendation,
      });

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.message || 'Could not update your progress.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button asChild variant="ghost">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
        {user && (
          <Button onClick={handleCompleteCourse} disabled={isAlreadyCompleted}>
            <CheckCircle className="mr-2 h-4 w-4" />
            {isAlreadyCompleted ? 'Completed' : 'Mark as Complete'}
          </Button>
        )}
      </div>

      <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
      <p className="text-muted-foreground text-lg mb-8">{course.description}</p>
      
      <div className="aspect-video mb-8">
        <iframe
          className="w-full h-full rounded-xl border-2 border-border"
          src={course.videoUrl}
          title={course.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {topic && (
        <Card>
          <article className="p-6 sm:p-8">
            <MarkdownRenderer content={topic.content} />
          </article>
        </Card>
      )}
    </div>
  );
}
