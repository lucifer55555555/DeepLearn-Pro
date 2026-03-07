
'use client';

import { useState } from 'react';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { MarkdownRenderer } from '@/components/common/markdown-renderer';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function DiscussionsPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discussionsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'discussions') : null),
    [firestore]
  );
  const discussionsQuery = useMemoFirebase(
    () => (discussionsRef ? query(discussionsRef, orderBy('createdAt', 'desc')) : null),
    [discussionsRef]
  );

  const { data: posts, isLoading: isLoadingPosts } = useCollection(discussionsQuery);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !discussionsRef) {
      toast({
        variant: 'destructive',
        title: 'Not logged in',
        description: 'You must be logged in to post.',
      });
      return;
    }
    setIsSubmitting(true);
    
    addDocumentNonBlocking(discussionsRef, {
      userId: user.uid,
      userName: user.displayName || user.email,
      title,
      content,
      createdAt: serverTimestamp(),
    }).then(() => {
        setTitle('');
        setContent('');
        toast({
            title: 'Post submitted!',
            description: 'Your post has been added to the discussion.',
        });
        setIsSubmitting(false);
    }).catch((error: any) => {
        toast({
            variant: 'destructive',
            title: 'Submission failed',
            description: error.message || 'Could not submit your post.',
        });
        setIsSubmitting(false);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Discussions</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Share your project solutions, ask questions, and learn from the community.
        </p>
      </div>

      {isUserLoading ? (
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      ) : user ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Create a New Post</CardTitle>
            <CardDescription>Share your solution or ask a question.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., My Sentiment Analyzer Solution"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Your Post / Solution Code</Label>
                <Textarea
                  id="content"
                  placeholder="Share your code, thoughts, and questions here. You can use Markdown for formatting."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Post
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card className="text-center p-8">
          <CardTitle>Join the Discussion</CardTitle>
          <CardDescription className="mt-2 mb-4">
            You need to be logged in to create posts and join the conversation.
          </CardDescription>
          <Button asChild>
            <Link href="/login">Login to Post</Link>
          </Button>
        </Card>
      )}

      <div className="flex flex-col gap-6">
        <h2 className="font-headline text-2xl">Recent Posts</h2>
        {isLoadingPosts ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{post.userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <span>{post.userName}</span>
                  <span>&middot;</span>
                   <span>
                    {post.createdAt?.toDate ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 'just now'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm prose-invert max-w-none prose-pre:bg-background prose-pre:p-4 prose-pre:rounded-md">
                    <MarkdownRenderer content={post.content} />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center">No discussions yet. Be the first to post!</p>
        )}
      </div>
    </div>
  );
}
