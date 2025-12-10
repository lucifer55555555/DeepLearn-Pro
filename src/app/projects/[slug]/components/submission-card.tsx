
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Send, CheckCircle, XCircle, Lightbulb, TrendingUp, Code, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { projectSubmissionFeedback, ProjectSubmissionFeedbackOutput } from '@/ai/flows/project-submission-feedback';
import { useUser } from '@/firebase';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { handleProjectSubmission } from '@/ai/flows/handle-project-submission';


type SubmissionCardProps = {
    projectId: string;
    projectTitle: string;
    solutionCode: string;
};

export function SubmissionCard({ projectId, projectTitle, solutionCode }: SubmissionCardProps) {
  const { user } = useUser();
  const [userCode, setUserCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState<ProjectSubmissionFeedbackOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!userCode || !user) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: !user ? 'You must be logged in to submit.' : 'Please enter your code to submit.',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedbackResult(null);

    try {
      const result = await projectSubmissionFeedback({
        projectTitle,
        userCode,
        solutionCode,
      });

      setFeedbackResult(result);
      
      if (result.isCorrect) {
        // Call the new server-side function to handle the update atomically
        const progressResult = await handleProjectSubmission({ userId: user.uid, projectId });
        
        if (progressResult.updated) {
          toast({
            title: 'Correct Solution!',
            description: 'Great job! Your project has been marked as solved and a new recommendation is ready.',
            className: 'bg-green-500/10 border-green-500/20 text-green-500',
          });
        } else {
          toast({
            title: 'Correct Again!',
            description: 'You\'ve already solved this project, but nice work on another correct submission!',
          });
        }
      } else {
         toast({
          variant: 'destructive',
          title: 'Review the Feedback',
          description: 'Your solution has some areas for improvement. See the feedback below.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.message || 'Failed to process your submission.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
         <Card className="text-center p-8">
          <CardTitle className="font-headline">Submit Your Solution</CardTitle>
          <CardDescription className="mt-2 mb-4">
            You need to be logged in to submit your project and get feedback.
          </CardDescription>
          <Button asChild>
            <Link href="/login">Login to Submit</Link>
          </Button>
        </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
        <Card>
        <CardHeader>
            <CardTitle className="font-headline">Submit Your Solution</CardTitle>
            <CardDescription>Enter your Python code below to get instant feedback from our AI reviewer.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
            <Label htmlFor="solution-code">Your Code</Label>
            <Textarea
                id="solution-code"
                placeholder="Paste your Python code here..."
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                required
                rows={15}
                className="font-code text-sm bg-background"
            />
            </div>
            <Button onClick={handleSubmit} disabled={isSubmitting || !userCode}>
            {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Send className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? 'Analyzing...' : 'Submit for Review'}
            </Button>
        </CardContent>
        </Card>

        {isSubmitting && (
            <Card className='flex items-center justify-center p-12'>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className='ml-4 text-muted-foreground'>Analyzing your code...</p>
            </Card>
        )}

        {feedbackResult && (
            <Card>
                <CardHeader>
                    <Alert variant={feedbackResult.isCorrect ? 'default' : 'destructive'} className={cn(
                        'flex items-center gap-4',
                        feedbackResult.isCorrect ? 'border-green-500/50 text-green-400' : ''
                    )}>
                        {feedbackResult.isCorrect ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                        <div>
                            <AlertTitle className="font-headline text-lg">
                                {feedbackResult.isCorrect ? 'Correct Solution!' : 'Areas for Improvement'}
                            </AlertTitle>
                            <AlertDescription className="text-foreground/80">
                                {feedbackResult.isCorrect ? 'Congratulations! Your code is functionally correct.' : 'Your solution has some issues. See the feedback below.'}
                            </AlertDescription>
                        </div>
                    </Alert>
                </CardHeader>
                <CardContent className='flex flex-col gap-6'>
                    <Card className='bg-card/50'>
                        <CardHeader className='flex-row items-center gap-3 space-y-0'>
                            <ListChecks className='h-5 w-5 text-purple-400'/>
                            <CardTitle className='text-lg font-semibold'>Key Takeaways</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className='list-disc pl-5 text-muted-foreground space-y-2'>
                                {feedbackResult.keyTakeaways.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className='bg-card/50'>
                        <CardHeader className='flex-row items-center gap-3 space-y-0'>
                            <Lightbulb className='h-5 w-5 text-yellow-400'/>
                            <CardTitle className='text-lg font-semibold'>What You Did Well</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground'>{feedbackResult.positiveFeedback}</p>
                        </CardContent>
                    </Card>
                     <Card className='bg-card/50'>
                        <CardHeader className='flex-row items-center gap-3 space-y-0'>
                            <TrendingUp className='h-5 w-5 text-orange-400'/>
                            <CardTitle className='text-lg font-semibold'>Areas for Improvement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground'>{feedbackResult.areasForImprovement}</p>
                        </CardContent>
                    </Card>
                     <Card className='bg-card/50'>
                        <CardHeader className='flex-row items-center gap-3 space-y-0'>
                            <Code className='h-5 w-5 text-sky-400'/>
                            <CardTitle className='text-lg font-semibold'>Suggested Solution</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <pre className='bg-background rounded-md p-4 font-code text-sm overflow-x-auto'>
                                <code>
                                    {feedbackResult.suggestedSolution}
                                </code>
                           </pre>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
