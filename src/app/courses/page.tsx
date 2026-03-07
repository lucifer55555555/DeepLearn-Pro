
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Course } from '@/lib/data';
import { firestoreService } from '@/firebase/firestore/services';
import { DynamicThumbnail, getVariantFromImageId } from '@/components/ui/dynamic-thumbnail';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function CourseCard({ course, index }: { course: Course, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={cn("group grid grid-cols-1 md:grid-cols-2 gap-6 items-center", isEven ? "md:grid-flow-col-dense" : "")}>
      <div className={cn("relative w-full h-80 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/10", isEven ? "md:order-2" : "")}>
        <DynamicThumbnail variant={getVariantFromImageId(course.imageId)} />
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
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await firestoreService.getCourses();
        setCoursesList(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Courses</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Browse our catalog of structured courses to find your next learning adventure, from beginner to advanced topics.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {coursesList.length > 0 ? (
            coursesList.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No courses found in database.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
