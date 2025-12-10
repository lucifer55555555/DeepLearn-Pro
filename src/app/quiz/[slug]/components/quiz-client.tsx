'use client';

import { useState } from 'react';
import type { Quiz } from '@/lib/data';
import { personalizedQuizFeedback } from '@/ai/flows/personalized-quiz-feedback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, Loader2, RotateCw } from 'lucide-react';
import Link from 'next/link';

type UserAnswers = Record<string, string>;

export function QuizClient({ quiz, learningNote }: { quiz: Quiz, learningNote: string }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleOptionChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setQuizFinished(true);
    setIsLoadingFeedback(true);
    
    let correctCount = 0;
    const correctAnswers: Record<string, string> = {};
    quiz.questions.forEach(q => {
        correctAnswers[q.id] = q.correctAnswer;
        if (userAnswers[q.id] === q.correctAnswer) {
            correctCount++;
        }
    });

    setScore(correctCount);

    try {
        const feedbackResponse = await personalizedQuizFeedback({
            quizTopic: quiz.title,
            userAnswers,
            correctAnswers,
            learningNotes: learningNote
        });
        setFeedback(feedbackResponse.feedback);
    } catch (error) {
        console.error("Error getting feedback:", error);
        setFeedback("Sorry, we couldn't generate feedback at this time. Please check your answers.");
    }

    setIsLoadingFeedback(false);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizFinished(false);
    setFeedback('');
    setScore(0);
  }

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-2xl text-center">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
                <CardDescription>
                    You scored {score} out of {quiz.questions.length}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoadingFeedback ? (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                        <p className="text-muted-foreground">Generating your personalized feedback...</p>
                    </div>
                ) : (
                    <div className="text-left bg-background p-4 rounded-md border">
                        <h3 className="font-headline text-lg mb-2">Personalized Feedback</h3>
                        <p className="text-sm text-muted-foreground">{feedback}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restartQuiz} variant="outline">
                    <RotateCw className="mr-2 h-4 w-4" />
                    Try Again
                </Button>
                <Button asChild>
                    <Link href="/quiz">
                        <Check className="mr-2 h-4 w-4" />
                        More Quizzes
                    </Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <Button asChild variant="ghost" className="mb-6 -ml-4">
            <Link href="/quiz">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
            </Link>
        </Button>
      <Card>
        <CardHeader>
            <div className='flex justify-between items-center mb-2'>
                <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
                <p className='text-sm text-muted-foreground'>
                    {currentQuestionIndex + 1} / {quiz.questions.length}
                </p>
            </div>
            <Progress value={progress} />
        </CardHeader>
        <CardContent className="min-h-[250px]">
          <h3 className="font-semibold text-lg mb-6">{currentQuestion.question}</h3>
          <RadioGroup
            value={userAnswers[currentQuestion.id] || ''}
            onValueChange={(value) => handleOptionChange(currentQuestion.id, value)}
            className="gap-4"
          >
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!userAnswers[currentQuestion.id]}>
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
            {currentQuestionIndex < quiz.questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
