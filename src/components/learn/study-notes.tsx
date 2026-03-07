
'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Notebook, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyNotesProps {
    topicId: string;
}

const STORAGE_KEY_PREFIX = 'deeplearn_pro_notes_';

export function StudyNotes({ topicId }: StudyNotesProps) {
    const [notes, setNotes] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const savedNotes = localStorage.getItem(STORAGE_KEY_PREFIX + topicId);
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, [topicId]);

    const handleSave = () => {
        localStorage.setItem(STORAGE_KEY_PREFIX + topicId, notes);
        setIsEditing(false);
        toast({
            title: 'Notes Saved',
            description: 'Your notes for this topic have been saved locally.',
        });
    };

    const handleClear = () => {
        if (confirm('Are you sure you want to clear your notes for this topic?')) {
            localStorage.removeItem(STORAGE_KEY_PREFIX + topicId);
            setNotes('');
            toast({
                title: 'Notes Cleared',
                description: 'Your local notes have been removed.',
            });
        }
    };

    return (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm sticky top-8">
            <CardHeader className="pb-3">
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Notebook className="h-5 w-5 text-primary" />
                    Study Notes
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Jot down your thoughts, code snippets, or key takeaways..."
                        className="min-h-[200px] bg-background/50 resize-none focus-visible:ring-primary/50"
                        autoFocus
                    />
                ) : (
                    <div
                        className="min-h-[200px] p-3 rounded-md bg-background/30 text-sm whitespace-pre-wrap cursor-pointer hover:bg-background/50 transition-colors"
                        onClick={() => setIsEditing(true)}
                    >
                        {notes || "Click to start taking notes..."}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between gap-2 border-t pt-4">
                {isEditing ? (
                    <Button size="sm" onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Notes
                    </Button>
                ) : (
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="flex-1">
                        Edit Notes
                    </Button>
                )}
                {notes && (
                    <Button size="sm" variant="ghost" onClick={handleClear} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
