'use client';

'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Quiz } from '@/lib/data';
import { firestoreService } from '@/firebase/firestore/services';
import { QuizClient } from './components/quiz-client';
import { Loader2 } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export default function QuizSlugPage({ params }: Props) {
  const { slug } = React.use(params);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [learningNote, setLearningNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const quizData = await firestoreService.getQuiz(slug);
        if (quizData) {
          setQuiz(quizData);
          const topicData = await firestoreService.getLearningTopic(quizData.topic);
          if (topicData) {
            setLearningNote(topicData.content);
          }
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz) {
    notFound();
  }

  return <QuizClient quiz={quiz} learningNote={learningNote} />;
}

