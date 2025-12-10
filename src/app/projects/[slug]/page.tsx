
'use client';

import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MarkdownRenderer } from '@/components/common/markdown-renderer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubmissionCard } from './components/submission-card';
import { SolutionCard } from './components/solution-card';

type Props = {
  params: { slug: string };
};

export default function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = projects.find((p) => p.id === slug);
  
  if (!project) {
    notFound();
  }
  
  // Extract solution code from the markdown content
  const solutionCodeMatch = project.content.match(/```python\n([\s\S]*?)\n```/);
  const solutionCode = solutionCodeMatch ? solutionCodeMatch[1] : '';
  
  // Remove the solution code from the main content to be displayed separately
  const projectContent = project.content.replace(/## 6\. Solution Code[\s\S]*/, '');


  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <div className='text-center mb-8'>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-muted-foreground text-lg mb-4">{project.description}</p>
          <div className="flex gap-2 justify-center">
              <Badge variant={project.difficulty === 'Beginner' ? 'default' : project.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>{project.difficulty}</Badge>
              {project.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
          </div>
        </div>
      </div>
      
      <Card>
        <article className="p-6 sm:p-8">
          <MarkdownRenderer content={projectContent} />
        </article>
      </Card>

      <SolutionCard solutionCode={solutionCode} />

      <SubmissionCard projectId={project.id} projectTitle={project.title} solutionCode={solutionCode} />
    </div>
  );
}
