
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

type SolutionCardProps = {
    solutionCode: string;
};

export function SolutionCard({ solutionCode }: SolutionCardProps) {
    const [isSolutionVisible, setIsSolutionVisible] = useState(false);

    if (!solutionCode) {
        return null;
    }

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div className='flex items-center gap-3'>
                    <Code className="h-5 w-5 text-sky-400" />
                    <div className='flex flex-col gap-0'>
                        <CardTitle className="font-headline">Official Solution</CardTitle>
                        <CardDescription>Click the button to reveal the solution.</CardDescription>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSolutionVisible(!isSolutionVisible)}
                    aria-label={isSolutionVisible ? 'Hide solution' : 'Show solution'}
                >
                    {isSolutionVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </CardHeader>
            {isSolutionVisible && (
                <CardContent>
                    <pre className="bg-background rounded-md p-4 font-code text-sm overflow-x-auto">
                        <code>
                            {solutionCode}
                        </code>
                    </pre>
                </CardContent>
            )}
        </Card>
    );
}
