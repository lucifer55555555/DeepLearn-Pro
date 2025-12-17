"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, serverTimestamp } from "firebase/firestore";

import { useUser, useFirestore } from "@/firebase";
import { useCollection } from "@/firebase/firestore/use-collection";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { formatDistanceToNow } from "date-fns";

/* ========================================================= */

export default function DiscussionsPage() {
  const { user, loading: isUserLoading } = useUser();

  const firestore = useFirestore();
  const { toast } = useToast();

  /* ---------- IMPORTANT: block Firebase during build ---------- */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- Form State ---------- */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------- Firestore Query (CLIENT ONLY) ---------- */
  const discussionsQuery = useMemo(() => {
    if (!mounted || !firestore) return null;

    return query(
      collection(firestore, "discussions"),
      orderBy("createdAt", "desc")
    );
  }, [mounted, firestore]);

  /* ---------- SAFE HOOK CALL ---------- */
  const collectionState =
    mounted && discussionsQuery
      ? useCollection(discussionsQuery)
      : { data: null, isLoading: true };

  const { data: posts, isLoading } = collectionState;

  /* ---------- Submit Handler ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) return;

    setIsSubmitting(true);
    try {
      await addDocumentNonBlocking(collection(firestore, "discussions"), {
        title,
        content,
        userId: user.uid,
        userName: user.displayName || user.email,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setContent("");
      toast({ title: "Post added successfully!" });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- BUILD / LOAD SAFE ---------- */
  if (!mounted || isUserLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  /* ======================= UI ======================= */
  return (
    <div className="flex flex-col gap-8">
      {/* ---------- Header ---------- */}
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold">Discussions</h1>
        <p className="text-muted-foreground mt-2">
          Share solutions, ask questions, and learn together
        </p>
      </div>

      {/* ---------- Create Post ---------- */}
      {user ? (
        <Card>
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
            <CardDescription>Share your thoughts or solutions</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Content</Label>
                <Textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Post
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card className="text-center p-6">
          <CardTitle>Login Required</CardTitle>
          <Button asChild className="mt-4">
            <Link href="/login">Login</Link>
          </Button>
        </Card>
      )}

      {/* ---------- Posts ---------- */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Loader2 className="mx-auto animate-spin" />
        ) : posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>
                      {post.userName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{post.userName}</span>
                  <span>·</span>
                  <span>
                    {post.createdAt?.toDate
                      ? formatDistanceToNow(post.createdAt.toDate(), {
                          addSuffix: true,
                        })
                      : "just now"}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <MarkdownRenderer content={post.content} />
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No discussions yet. Be the first to post!
          </p>
        )}
      </div>
    </div>
  );
}
