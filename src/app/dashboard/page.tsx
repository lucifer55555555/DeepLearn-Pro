'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getAdaptiveRecommendation, AdaptiveRecommendationOutput } from '@/ai/flows/adaptive-recommendation';
import { progressStorage, LocalProgress, TopicMastery } from '@/lib/progress';
import { Loader2, ArrowRight, BrainCircuit, Target, AlertTriangle, Sparkles, Flame, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AnalyticsPanel } from './components/analytics-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
    const [progress, setProgress] = useState<LocalProgress | null>(null);
    const [recommendation, setRecommendation] = useState<AdaptiveRecommendationOutput | null>(null);
    const [isLoadingRec, setIsLoadingRec] = useState(false);

    useEffect(() => {
        const data = progressStorage.get();
        setProgress(data);

        // Fetch AI recommendation
        const fetchRecommendation = async () => {
            setIsLoadingRec(true);
            try {
                const result = await getAdaptiveRecommendation({
                    topicMastery: data.topicMastery.map(t => ({ topicName: t.topicName, score: t.score, quizzesTaken: t.quizzesTaken })),
                    completedCourses: data.completedCourseIds,
                    completedProjects: data.solvedProjectIds,
                    weakTopics: progressStorage.getWeakTopics().map(t => t.topicName),
                    streakDays: data.learningStreakDays,
                });
                setRecommendation(result);
            } catch (error) {
                console.error('Failed to get recommendation:', error);
            } finally {
                setIsLoadingRec(false);
            }
        };

        fetchRecommendation();
    }, []);

    if (!progress) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    const weakTopics = progressStorage.getWeakTopics();
    const overallMastery = progressStorage.getOverallMastery();

    return (
        <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="font-headline text-4xl font-bold">Your Learning Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Track your progress and let AI guide your next steps.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-card/50 px-4 py-2 rounded-xl border">
                    <div className="flex items-center gap-2">
                        <Flame className={cn("h-5 w-5", progress.learningStreakDays > 0 ? "text-orange-500" : "text-muted-foreground")} />
                        <span className="font-bold">{progress.learningStreakDays} Day Streak</span>
                    </div>
                    <div className="w-px h-6 bg-border mx-2" />
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-500" />
                        <span className="font-medium">{Math.round(progress.totalTimeSpentMinutes / 60)}h {progress.totalTimeSpentMinutes % 60}m</span>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="adaptive" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                    <TabsTrigger value="adaptive">Adaptive Path</TabsTrigger>
                    <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="adaptive" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    {/* AI Recommendation Card */}
                    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-48 h-48 text-primary" />
                        </div>
                        <CardHeader className="relative z-10 pb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <BrainCircuit className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="font-headline text-2xl">AI Learning Path</CardTitle>
                                    <CardDescription>Personalized recommendation based on your profile</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            {isLoadingRec ? (
                                <div className="flex items-center gap-3 py-6 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Generating your personalized path...
                                </div>
                            ) : recommendation ? (
                                <div className="space-y-6">
                                    <div className="bg-background/80 backdrop-blur border rounded-xl p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                            <Target className="h-5 w-5 text-primary" />
                                            Next Objective
                                        </h3>
                                        <p className="text-xl font-medium mb-3">{recommendation.nextStep}</p>
                                        <p className="text-muted-foreground">{recommendation.reason}</p>
                                        {recommendation.weakAreaAdvice && (
                                            <div className="mt-4 p-3 bg-destructive/10 text-destructive-foreground rounded-lg border border-destructive/20 text-sm">
                                                <strong>Tip:</strong> {recommendation.weakAreaAdvice}
                                            </div>
                                        )}
                                    </div>
                                    <p className="italic text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                                        "{recommendation.motivationalMessage}"
                                    </p>
                                </div>
                            ) : (
                                <p className="py-6 text-muted-foreground">Start learning to get AI recommendations.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Weak Areas Grid */}
                    {weakTopics.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                                <AlertTriangle className="h-6 w-6 text-amber-500" />
                                Focus Areas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {weakTopics.map(topic => (
                                    <Card key={topic.topicSlug} className="border-amber-500/20 bg-amber-500/5">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg">{topic.topicName}</CardTitle>
                                            <CardDescription>Mastery Score: {topic.score}%</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Progress value={topic.score} className="h-2 bg-amber-500/20" />
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild variant="outline" className="w-full text-amber-500 border-amber-500/20 hover:bg-amber-500/10">
                                                <Link href={`/courses?topic=${topic.topicSlug}`}>
                                                    Review Material
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatBox label="Overall Mastery" value={`${overallMastery}%`} />
                        <StatBox label="Courses Done" value={progress.completedCourseIds.length} />
                        <StatBox label="Projects Solved" value={progress.solvedProjectIds.length} />
                        <StatBox label="Quizzes Taken" value={progress.completedQuizIds.length} />
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="animate-in fade-in slide-in-from-bottom-4">
                    <AnalyticsPanel progress={progress} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
    return (
        <Card className="bg-card/50">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
                <p className="text-4xl font-headline font-bold text-foreground">{value}</p>
            </CardContent>
        </Card>
    );
}
