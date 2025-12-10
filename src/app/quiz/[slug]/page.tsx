import { notFound } from 'next/navigation';
import { quizzes, learningTopics } from '@/lib/data';
import { QuizClient } from './components/quiz-client';

type Props = {
  params: { slug: string };
};

export default function QuizSlugPage({ params }: Props) {
  const { slug } = params;
  const quiz = quizzes.find((q) => q.slug === slug);
  
  if (!quiz) {
    notFound();
  }

  const learningNote = learningTopics.find(topic => topic.slug === quiz.topic)?.content || '';

  return <QuizClient quiz={quiz} learningNote={learningNote} />;
}

export async function generateStaticParams() {
  return quizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}
