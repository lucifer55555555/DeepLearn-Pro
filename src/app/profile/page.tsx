"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import { useUser, useFirestore, useFirebaseAuth } from "@/firebase";
import { useDoc } from "@/firebase/firestore/use-doc";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Loader2,
  BookCheck,
  FlaskConical,
  PencilRuler,
  Bot,
  BarChart,
} from "lucide-react";

import { ActivityChart } from "./components/activity-chart";
import { useToast } from "@/hooks/use-toast";

/* -------------------- Stat Card -------------------- */
const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) => (
  <Card className="bg-card/50">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

/* -------------------- Page -------------------- */
export default function ProfilePage() {
  // Auth state (user + loading)
  const { user, loading: isUserLoading } = useUser();

  // Firebase services
  const firestore = useFirestore();
  const auth = useFirebaseAuth();

  const router = useRouter();
  const { toast } = useToast();

  /* ✅ SAFE: React useMemo */
  const userProfileRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, "users", user.uid, "userProfiles", user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } =
    useDoc(userProfileRef);

  /* -------------------- Sign Out -------------------- */
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: error.message,
      });
    }
  };

  /* -------------------- Loading -------------------- */
  if (isUserLoading || (user && isProfileLoading)) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  /* -------------------- Not Logged In -------------------- */
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Card className="text-center p-8 max-w-md">
          <CardTitle className="font-headline text-2xl">
            Access Denied
          </CardTitle>
          <CardDescription className="mt-2 mb-4">
            You need to be logged in to view your profile.
          </CardDescription>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </Card>
      </div>
    );
  }

  /* -------------------- Profile Missing -------------------- */
  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Card className="text-center p-8 max-w-md">
          <CardTitle className="font-headline text-2xl">
            Profile Not Found
          </CardTitle>
          <CardDescription className="mt-2 mb-4">
            We couldn't find your profile data.
          </CardDescription>
          <Button asChild variant="secondary">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const {
    name,
    email,
    coursesCompleted,
    solvedProjects,
    totalSubmissions,
    lastRecommendation,
    courseCompletionLog,
    projectCompletionLog,
  } = userProfile;

  const completionLogs = {
    courses: courseCompletionLog || [],
    projects: projectCompletionLog || [],
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarFallback className="text-2xl bg-card">
              {name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">{name}</h1>
            <p className="text-muted-foreground">{email}</p>
          </div>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Courses Completed"
          value={coursesCompleted || 0}
          icon={BookCheck}
        />
        <StatCard
          title="Projects Solved"
          value={solvedProjects || 0}
          icon={FlaskConical}
        />
        <StatCard
          title="Total Submissions"
          value={totalSubmissions || 0}
          icon={PencilRuler}
        />
      </div>

      {lastRecommendation && (
        <Card className="bg-gradient-to-br from-primary/10 to-card">
          <CardHeader className="flex-row items-start gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg border border-primary/20">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">
                AI Coach Recommendation
              </CardTitle>
              <CardDescription>
                Your personalized next step.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{lastRecommendation}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex-row items-start gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-lg border border-primary/20">
            <BarChart className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">
              Weekly Learning Activity
            </CardTitle>
            <CardDescription>
              Completions over the last 12 weeks.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ActivityChart completionLogs={completionLogs} />
        </CardContent>
      </Card>
    </div>
  );
}
