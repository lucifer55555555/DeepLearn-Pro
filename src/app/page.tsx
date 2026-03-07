
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Pencil, LayoutGrid, Route, FlaskConical, Loader2, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { firestoreService } from '@/firebase/firestore/services';
import { courses, learningTopics, quizzes, roadmaps as staticRoadmaps, projects as staticProjects } from '@/lib/data';
import { doc, setDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { progressStorage, LocalProgress } from '@/lib/progress';

export default function Home() {
  const [isMigrating, setIsMigrating] = React.useState(false);
  const [localProgress, setLocalProgress] = React.useState<LocalProgress | null>(null);

  React.useEffect(() => {
    setLocalProgress(progressStorage.get());
  }, []);
  const { firestore: db } = initializeFirebase();

  const handleMigrate = async () => {
    setIsMigrating(true);
    try {
      console.log('Starting migration with data:', { courses, learningTopics, quizzes, roadmaps: staticRoadmaps, projects: staticProjects });
      for (const course of courses) {
        console.log(`Migrating course: ${course.id}`);
        await setDoc(doc(db, 'courses', course.id), course);
      }
      for (const topic of learningTopics) {
        console.log(`Migrating topic: ${topic.slug}`);
        await setDoc(doc(db, 'learningTopics', topic.slug), topic);
      }
      for (const quiz of quizzes) {
        console.log(`Migrating quiz: ${quiz.slug}`);
        await setDoc(doc(db, 'quizzes', quiz.slug), quiz);
      }
      for (const roadmap of staticRoadmaps) {
        console.log(`Migrating roadmap: ${roadmap.id}`);
        await setDoc(doc(db, 'roadmaps', roadmap.id), roadmap);
      }
      for (const project of staticProjects) {
        console.log(`Migrating project: ${project.id}`);
        await setDoc(doc(db, 'projects', project.id), project);
      }
      alert('Database populated successfully!');
    } catch (e: any) {
      console.error('Migration error detail:', e);
      alert(`Migration failed: ${e.message}. Check console.`);
    } finally {
      setIsMigrating(false);
    }
  };

  const featureCards = [
    {
      title: 'Learn',
      description: 'Master ML & DL with our curated notes.',
      href: '/learn',
      icon: BookOpen,
      className: 'border-cyan-500/20 hover:border-cyan-500/80',
      iconClassName: 'text-cyan-500',
    },
    {
      title: 'Quiz',
      description: 'Test your knowledge and get AI feedback.',
      href: '/quiz',
      icon: Pencil,
      className: 'border-fuchsia-500/20 hover:border-fuchsia-500/80',
      iconClassName: 'text-fuchsia-500',
    },
    {
      title: 'Courses',
      description: 'Structured courses for all skill levels.',
      href: '/courses',
      icon: LayoutGrid,
      className: 'border-amber-500/20 hover:border-amber-500/80',
      iconClassName: 'text-amber-500',
    },
    {
      title: 'Roadmaps',
      description: 'Follow a structured path to mastery.',
      href: '/roadmaps',
      icon: Route,
      className: 'border-green-500/20 hover:border-green-500/80',
      iconClassName: 'text-green-500',
    },
    {
      title: 'Projects',
      description: 'Apply your skills with hands-on projects.',
      href: '/projects',
      icon: FlaskConical,
      className: 'border-indigo-500/20 hover:border-indigo-500/80',
      iconClassName: 'text-indigo-500',
    },
  ];

  return (
    <div className="flex flex-col gap-16">
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative z-10 flex flex-col items-start gap-4 p-4 text-left">
          <div className="bg-primary/10 text-primary font-semibold text-sm py-1 px-3 rounded-full border border-primary/30">
            AI-Powered Learning Platform
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold">
            Welcome to DeepLearn Pro
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-muted-foreground">
            Your AI-powered journey into the world of Machine Learning and Deep Learning starts here.
          </p>
          <div className="flex gap-4 mt-4">
            <Button size="lg" asChild>
              <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={handleMigrate} disabled={isMigrating}>
              {isMigrating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Database className="mr-2 h-5 w-5" />}
              Init Database
            </Button>
          </div>
        </div>
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden rounded-2xl border bg-grid">
          <div className="absolute inset-0 bg-gradient-radial from-background/30 to-background" />

          {/* Neural Skill Tree Animation */}
          <div className="relative flex items-center justify-center w-64 h-64">
            {/* Central Core */}
            <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-pulse-slow border-2 border-primary/50 flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-full shadow-[0_0_20px_theme(colors.primary)]"></div>
            </div>

            {/* Branching Pathways */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div key={deg} className="absolute w-full h-full" style={{ transform: `rotate(${deg}deg)` }}>
                {/* Main Branch */}
                <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-primary/30 origin-left">
                  <div className="absolute w-full h-full bg-primary animate-flow opacity-0" style={{ animationDelay: `${(deg / 360) * 2}s` }}></div>
                </div>
                {/* Sub-branch */}
                <div className="absolute top-1/2 left-3/4 w-1/4 h-0.5 bg-primary/30 origin-left" style={{ transform: 'rotate(45deg) translateY(-50%)' }}>
                  <div className="absolute w-full h-full bg-primary animate-flow opacity-0" style={{ animationDelay: `${(deg / 360) * 2 + 0.5}s` }}></div>
                </div>
                <div className="absolute top-1/2 left-3/4 w-1/4 h-0.5 bg-primary/30 origin-left" style={{ transform: 'rotate(-45deg) translateY(50%)' }}>
                  <div className="absolute w-full h-full bg-primary animate-flow opacity-0" style={{ animationDelay: `${(deg / 360) * 2 + 0.7}s` }}></div>
                </div>
              </div>
            ))}

            {/* Nodes */}
            <div className="absolute w-4 h-4 rounded-full bg-cyan-500/80 top-[10%] left-[50%] -translate-x-1/2 animate-node-pulse shadow-[0_0_15px_theme(colors.cyan.500)]" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute w-4 h-4 rounded-full bg-fuchsia-500/80 top-[75%] left-[15%] animate-node-pulse shadow-[0_0_15px_theme(colors.fuchsia.500)]" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute w-4 h-4 rounded-full bg-amber-500/80 top-[75%] right-[15%] animate-node-pulse shadow-[0_0_15px_theme(colors.amber.500)]" style={{ animationDelay: '0.6s' }}></div>

          </div>
        </div>
      </section>

      {localProgress && (localProgress.completedQuizIds.length > 0 || localProgress.lastVisitedPath !== '/') && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="font-headline text-2xl font-bold mb-6">Resume Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localProgress.lastVisitedPath !== '/' && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Last Visited</p>
                    <h3 className="font-headline text-lg">{localProgress.lastVisitedTitle}</h3>
                  </div>
                  <Button asChild size="sm">
                    <Link href={localProgress.lastVisitedPath}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {localProgress.completedQuizIds.length > 0 && (
              <Card className="bg-fuchsia-500/5 border-fuchsia-500/20">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-fuchsia-500 uppercase tracking-wider">Quizzes Completed</p>
                    <h3 className="font-headline text-lg">{localProgress.completedQuizIds.length} Quizzes</h3>
                  </div>
                  <Button asChild variant="secondary" size="sm" className="bg-fuchsia-100 text-fuchsia-900 hover:bg-fuchsia-200">
                    <Link href="/quiz">
                      View All
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      <section>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Start Your Journey</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Whether you're a beginner or an expert, we have the resources to help you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {featureCards.map((feature) => (
            <Link href={feature.href} key={feature.title} className="group block h-full">
              <Card className={cn(
                "h-full flex flex-col text-center items-center p-8 transition-all duration-500 bg-card/40 border-border/40 backdrop-blur-sm",
                "hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3 hover:bg-card/60 hover:border-primary/50",
                feature.className
              )}>
                <CardContent className="flex flex-col items-center gap-4 p-0">
                  <div className={cn(
                    "bg-primary/5 p-4 rounded-full border-2",
                    feature.className.replace('hover:', 'group-hover:')
                  )}>
                    <feature.icon className={cn("h-10 w-10 transition-colors", feature.iconClassName)} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h3 className="font-headline text-2xl text-card-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
