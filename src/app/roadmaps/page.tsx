'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Roadmap } from '@/lib/data';
import { firestoreService } from '@/firebase/firestore/services';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Route, GitBranch, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function RoadmapsPage() {
  const [roadmapsList, setRoadmapsList] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const data = await firestoreService.getRoadmaps();
        setRoadmapsList(data);
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmaps();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Learning Roadmaps</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Follow our structured roadmaps to master key topics in machine learning, one step at a time.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapsList.length > 0 ? (
            roadmapsList.map((roadmap) => (
              <Link href={`/roadmaps/${roadmap.id}`} key={roadmap.id} className="group block">
                <Card className={cn(
                  "h-full flex flex-col text-left transition-all duration-300 bg-card/50 border border-border/30",
                  "hover:border-primary/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2"
                )}>
                  <CardHeader className="p-6">
                    <div className='flex items-center justify-between mb-4'>
                      <div className='p-3 bg-primary/10 rounded-lg border border-primary/20'>
                        <Route className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className='flex gap-2'>
                        <GitBranch className="h-3 w-3" />
                        {roadmap.steps.length} Steps
                      </Badge>
                    </div>
                    <CardTitle className="font-headline text-xl">{roadmap.title}</CardTitle>
                    <CardDescription className="pt-1">A step-by-step guide to understanding {roadmap.topic}.</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto p-6 bg-card/80 border-t">
                    <Button asChild variant="link" className='text-primary p-0 h-auto'>
                      <span className="group-hover:underline">
                        View Roadmap <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-muted-foreground">No roadmaps found in database.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
