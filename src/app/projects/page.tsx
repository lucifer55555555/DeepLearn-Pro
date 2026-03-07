'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/data';
import { firestoreService } from '@/firebase/firestore/services';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { DynamicThumbnail, getVariantFromImageId } from '@/components/ui/dynamic-thumbnail';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <Card className={cn(
        "h-full flex flex-col text-left transition-all duration-300 bg-card/50 border border-border/30",
        "hover:border-primary/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2"
      )}>
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl border-b">
          <DynamicThumbnail variant={getVariantFromImageId(project.imageId)} />
        </div>
        <CardHeader className="p-6 flex-1">
          <div className='flex items-center justify-between mb-4'>
            <Badge variant={project.difficulty === 'Beginner' ? 'default' : project.difficulty === 'Intermediate' ? 'secondary' : 'destructive'} className='border-transparent self-start'>
              {project.difficulty}
            </Badge>
          </div>
          <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
          <CardDescription className="pt-1">{project.description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-6 bg-card/80 border-t">
          <Button asChild variant="link" className='text-primary p-0 h-auto'>
            <span className="group-hover:underline">
              View Project <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await firestoreService.getProjects();
        setProjectsList(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Hands-on Projects</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Go from theory to practice. Build real-world machine learning projects and solidify your skills.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.length > 0 ? (
            projectsList.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-muted-foreground">No projects found in database.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
