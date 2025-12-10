
import Link from 'next/link';
import { learningTopics } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookCopy } from 'lucide-react';
import { cn } from '@/lib/utils';

const topicColors = [
    'border-sky-500/20 hover:border-sky-500/80',
    'border-green-500/20 hover:border-green-500/80',
    'border-red-500/20 hover:border-red-500/80',
    'border-yellow-500/20 hover:border-yellow-500/80',
]

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Learning Center</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Dive into our curated notes on machine learning and deep learning concepts. Solidify your understanding of key topics.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningTopics.map((topic, index) => (
          <Link href={`/learn/${topic.slug}`} key={topic.slug} className="group block">
            <Card className={cn(
              "h-full flex flex-col text-left p-6 transition-all duration-300 bg-card/50 border",
              "hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2",
              topicColors[index % topicColors.length]
            )}>
              <CardHeader className="flex-row items-start gap-4 p-0">
                  <div className={cn("bg-primary/5 p-3 rounded-lg border-2", topicColors[index % topicColors.length].replace('hover:', 'group-hover:'))}>
                      <BookCopy className="h-6 w-6 text-primary" />
                  </div>
                  <div className='flex flex-col gap-1'>
                      <CardTitle className="font-headline text-xl">{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                  </div>
              </CardHeader>
              <CardFooter className="mt-auto pt-6 p-0 justify-end">
                <Button asChild variant="link" className='text-primary'>
                  <span className="group-hover:underline">
                    Read Topic <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
