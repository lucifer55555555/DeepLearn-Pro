
import Image from 'next/image';
import Link from 'next/link';
import { courses, Course } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function CourseCard({ course, index }: { course: Course, index: number }) {
  const image = PlaceHolderImages.find(img => img.id === course.imageId);
  const isEven = index % 2 === 0;

  return (
    <div className={cn("group grid grid-cols-1 md:grid-cols-2 gap-6 items-center", isEven ? "md:grid-flow-col-dense" : "")}>
        <div className={cn("relative w-full h-80 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/10", isEven ? "md:order-2" : "")}>
             {image && (
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <Card className={cn("bg-transparent border-none shadow-none flex flex-col items-start", isEven ? "md:order-1" : "")}>
            <CardHeader>
                <div className="flex flex-col gap-3">
                    <Badge variant={course.difficulty === 'Beginner' ? 'default' : course.difficulty === 'Intermediate' ? 'secondary' : 'destructive'} className='border-transparent self-start'>
                        {course.difficulty}
                    </Badge>
                    <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
                </div>
                <CardDescription className="pt-2 text-base">{course.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild size="lg">
                    <Link href={`/courses/${course.id}`}>
                        Start Course <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Courses</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Browse our catalog of structured courses to find your next learning adventure, from beginner to advanced topics.
        </p>
      </div>
      <div className="flex flex-col gap-16">
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index}/>
        ))}
      </div>
    </div>
  );
}
