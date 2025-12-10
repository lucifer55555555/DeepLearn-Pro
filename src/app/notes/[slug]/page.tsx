
import { notFound } from 'next/navigation';
import { roadmaps } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, GitCommitHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  params: { slug: string };
};

export default function RoadmapPage({ params }: Props) {
  const { slug } = params;
  const roadmap = roadmaps.find((n) => n.id === slug);
  
  if (!roadmap) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/roadmaps">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Roadmaps
        </Link>
      </Button>

      <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8 text-center">{roadmap.title}</h1>
      
      <div className="relative flex flex-col items-start gap-8">
        {/* Vertical line */}
        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border/50" />

        {roadmap.steps.map((step, index) => (
            <div key={index} className="relative w-full pl-12">
                <div className="absolute top-2 left-5 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <Card className="bg-card/50 border border-border/30 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className='font-headline text-xl flex items-center gap-3'>
                            <div className='bg-primary/10 text-primary rounded-md p-2 border border-primary/20'>
                                {index + 1}
                            </div>
                            {step.title}
                        </CardTitle>
                        <CardDescription className='pt-2'>{step.description}</CardDescription>
                    </CardHeader>
                    {step.subSteps && (
                        <CardContent>
                            <ul className="flex flex-col gap-2">
                                {step.subSteps.map((subStep, subIndex) => (
                                    <li key={subIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span>{subStep}</span>
                                    </li>

                                ))}
                            </ul>
                        </CardContent>
                    )}
                </Card>
            </div>
        ))}
      </div>
    </div>
  );
}

// Generate static paths for all roadmaps
export async function generateStaticParams() {
  return roadmaps.map((roadmap) => ({
    slug: roadmap.id,
  }));
}
