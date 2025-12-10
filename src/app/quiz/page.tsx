
import Link from 'next/link';
import { quizzes } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle, FileQuestion } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function QuizPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Quiz Center</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Challenge yourself with our quizzes and get personalized feedback from our AI to accelerate your learning.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Link href={`/quiz/${quiz.slug}`} key={quiz.slug} className="group block">
            <Card className={cn(
              "h-full flex flex-col text-left transition-all duration-300 bg-card/50 border border-border/30",
              "hover:border-primary/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2"
            )}>
              <CardHeader className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='p-3 bg-primary/10 rounded-lg border border-primary/20'>
                        <HelpCircle className="h-6 w-6 text-primary"/>
                    </div>
                    <Badge variant="outline" className='flex gap-2'>
                        <FileQuestion className="h-3 w-3" />
                        {quiz.questions.length} Questions
                    </Badge>
                </div>
                <CardTitle className="font-headline text-xl">{quiz.title}</CardTitle>
                <CardDescription className="pt-1">{quiz.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto p-6 bg-card/80 border-t">
                <Button asChild variant="default" className='w-full'>
                  <span className='w-full text-center'>
                    Start Quiz <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
