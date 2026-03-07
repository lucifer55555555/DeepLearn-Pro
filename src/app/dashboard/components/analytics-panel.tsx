'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LocalProgress } from '@/lib/progress';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function AnalyticsPanel({ progress }: { progress: LocalProgress }) {
    const radarData = useMemo(() => {
        return progress.topicMastery.map(t => ({
            subject: t.topicName,
            A: t.score || 0,
            fullMark: 100,
        }));
    }, [progress]);

    const activityData = useMemo(() => {
        // Get last 7 days including today
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const activity = progress.dailyActivity.find(a => a.date === dateStr);
            days.push({
                date: d.toLocaleDateString('en-US', { weekday: 'short' }),
                minutes: activity?.minutesSpent || 0,
                completed: (activity?.coursesCompleted || 0) + (activity?.quizzesCompleted || 0) + (activity?.projectsSolved || 0),
            });
        }
        return days;
    }, [progress]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skill Radar Chart */}
            <Card className="h-[400px] flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">Skill Radar</CardTitle>
                    <CardDescription>Visual map of your topic mastery</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                            <Radar
                                name="Mastery"
                                dataKey="A"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Activity Bar Chart */}
            <Card className="h-[400px] flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">Learning Time (Last 7 Days)</CardTitle>
                    <CardDescription>Minutes spent actively learning</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                            />
                            <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Minutes" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Detailed Topic Bars */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline">Topic Breakdown</CardTitle>
                    <CardDescription>Detailed view of your progress in each subject area</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {progress.topicMastery.map(topic => (
                        <div key={topic.topicSlug} className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">{topic.topicName}</span>
                                <span className="text-muted-foreground">{topic.score}% (Based on {topic.quizzesTaken} quizzes)</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000"
                                    style={{ width: `${topic.score}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
