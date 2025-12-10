
import Link from 'next/link';
import { projects, Project } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FlaskConical, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function ProjectCard({ project }: { project: Project }) {
  const image = PlaceHolderImages.find(img => img.id === project.imageId);
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <Card className={cn(
        "h-full flex flex-col text-left transition-all duration-300 bg-card/50 border border-border/30",
        "hover:border-primary/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2"
      )}>
        {image && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-xl border-b">
              <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>
        )}
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
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Hands-on Projects</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Go from theory to practice. Build real-world machine learning projects and solidify your skills.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
