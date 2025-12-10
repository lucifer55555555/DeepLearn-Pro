'use server';

/**
 * @fileOverview Provides AI chatbot assistance for answering questions about machine learning and deep learning.
 *
 * - aiChatbotAssistance - A function that handles the chatbot assistance process.
 * - AIChatbotAssistanceInput - The input type for the aiChatbotAssistance function.
 * - AIChatbotAssistanceOutput - The return type for the aiChatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAssistanceInputSchema = z.object({
  question: z.string().describe('The user question about machine learning or deep learning concepts.'),
  learningMaterial: z.string().describe('The learning material to use as context for answering the question.'),
});
export type AIChatbotAssistanceInput = z.infer<typeof AIChatbotAssistanceInputSchema>;

const AIChatbotAssistanceOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot answer to the user question.'),
});
export type AIChatbotAssistanceOutput = z.infer<typeof AIChatbotAssistanceOutputSchema>;

export async function aiChatbotAssistance(input: AIChatbotAssistanceInput): Promise<AIChatbotAssistanceOutput> {
  return aiChatbotAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAssistancePrompt',
  input: {schema: AIChatbotAssistanceInputSchema},
  output: {schema: AIChatbotAssistanceOutputSchema},
  prompt: `You are an AI chatbot assistant specializing in machine learning and deep learning. Use the provided learning material to answer the user's question accurately and concisely.\n\nLearning Material:\n{{{learningMaterial}}}\n\nQuestion:\n{{{question}}}\n\nAnswer:`,
});

const aiChatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistanceFlow',
    inputSchema: AIChatbotAssistanceInputSchema,
    outputSchema: AIChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
