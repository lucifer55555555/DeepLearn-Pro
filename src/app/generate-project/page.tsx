'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { generateAiProject, AIProjectGeneratorOutput } from '@/ai/flows/ai-project-generator';
import { progressStorage } from '@/lib/progress';
import { Wand2, Loader2, Target, Database, ListChecks, Code, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function GenerateProjectPage() {
    const [domain, setDomain] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [project, setProject] = useState<AIProjectGeneratorOutput | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const progress = progressStorage.get();
            const completedTopics = progress.topicMastery
                .filter(t => t.score > 50)
                .map(t => t.topicName);

            const result = await generateAiProject({
                completedTopics: completedTopics.length > 0 ? completedTopics : ['Basic Python', 'Machine Learning Foundations'],
                preferredDomain: domain.trim() || undefined,
            });

            setProject(result);
        } catch (error) {
            console.error('Failed to generate project:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const difficultyColors = {
        Beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
        Intermediate: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        Advanced: 'bg-destructive/10 text-destructive border-destructive/20',
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-10 min-h-[80vh]">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Wand2 className="h-8 w-8 text-primary" />
                </div>
                <h1 className="font-headline text-4xl font-bold">AI Project Generator</h1>
                <p className="text-muted-foreground text-lg">
                    Stuck on what to build next? Let Gemini analyze your skills and suggest a personalized, portfolio-ready project.
                </p>

                <div className="flex items-center gap-3 pt-4 max-w-md mx-auto">
                    <Input
                        placeholder="Preferred domain (e.g., Healthcare, Finance)..."
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="h-12"
                    />
                    <Button
                        onClick={handleGenerate}
                        className="h-12 px-6 gap-2 shrink-0"
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <><Loader2 className="h-5 w-5 animate-spin" /> Generating...</>
                        ) : (
                            <><SparklesIcon /> Generate Idea</>
                        )}
                    </Button>
                </div>
            </div>

            {project && (
                <div className="animate-in fade-in slide-in-from-bottom-8 mt-8 space-y-6">

                    <Card className="border-primary/50 relative overflow-hidden bg-gradient-to-br from-card to-primary/5">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Rocket className="w-48 h-48 text-primary" />
                        </div>
                        <CardHeader className="pb-4 relative z-10">
                            <div className="flex justify-between items-start gap-4 mb-2">
                                <CardTitle className="text-3xl font-headline leading-tight">{project.title}</CardTitle>
                                <Badge variant="outline" className={difficultyColors[project.difficulty]}>
                                    {project.difficulty}
                                </Badge>
                            </div>
                            <CardDescription className="text-base font-medium text-foreground/80">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    Dataset Suggestion
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold mb-1">{project.datasetSuggestion.name}</p>
                                <p className="text-sm text-muted-foreground">{project.datasetSuggestion.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 md:row-span-2">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <ListChecks className="h-5 w-5 text-primary" />
                                    Implementation Steps
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {project.steps.map((step, i) => (
                                        <li key={i} className="flex gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm text-foreground/90">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-950 border-slate-800 text-slate-300">
                            <CardHeader className="border-b border-slate-800/50 py-3">
                                <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-400">
                                    <Code className="h-4 w-4" />
                                    Starter Code (main.py)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="p-4 bg-transparent overflow-x-auto text-xs font-mono">
                                    <pre><code>{project.starterCode}</code></pre>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-slate-800/50 py-3 bg-slate-900/50">
                                <Button asChild variant="secondary" size="sm" className="w-full text-xs">
                                    <Link href="/sandbox">Open in Sandbox <Target className="ml-2 h-3 w-3" /></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            )}
        </div>
    );
}

function SparklesIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    );
}
