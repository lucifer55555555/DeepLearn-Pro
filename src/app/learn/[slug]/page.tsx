import { notFound } from 'next/navigation';
import { learningTopics } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MarkdownRenderer } from '@/components/common/markdown-renderer';

type Props = {
  params: { slug: string };
};

export default function LearnTopicPage({ params }: Props) {
  const { slug } = params;
  const topic = learningTopics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/learn">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Link>
      </Button>
      <article className="bg-card p-6 sm:p-8 rounded-xl shadow-sm">
        <MarkdownRenderer content={topic.content} />
      </article>
    </div>
  );
}

// Generate static paths for all topics
export async function generateStaticParams() {
  return learningTopics.map((topic) => ({
    slug: topic.slug,
  }));
}
