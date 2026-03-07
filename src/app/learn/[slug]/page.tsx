'use client';

import * as React from 'react';
import { notFound } from 'next/navigation';
import { LearningTopic } from '@/lib/data';
import { firestoreService } from '@/firebase/firestore/services';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { MarkdownRenderer } from '@/components/common/markdown-renderer';
import { StudyNotes } from '@/components/learn/study-notes';
import { progressStorage } from '@/lib/progress';

type Props = {
  params: Promise<{ slug: string }>;
};

export default function LearnTopicPage({ params }: Props) {
  const { slug } = React.use(params);
  const [topic, setTopic] = React.useState<LearningTopic | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTopic() {
      try {
        const data = await firestoreService.getLearningTopic(slug);
        setTopic(data);
        if (data) {
          progressStorage.trackVisit(`/learn/${slug}`, data.title);
        }
      } catch (error) {
        console.error('Error fetching topic:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTopic();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!topic) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <article className="bg-card p-6 sm:p-8 rounded-xl shadow-sm border border-border/40">
          <MarkdownRenderer content={topic.content} />
        </article>
      </div>
      <aside className="lg:col-span-1">
        <StudyNotes topicId={slug} />
      </aside>
    </div>
  );
}
