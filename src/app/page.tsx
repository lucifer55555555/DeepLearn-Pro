"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Pencil, LayoutGrid, Route, FlaskConical, MessageSquare, User } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-home');
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
            <Button size="lg" className="mt-4" asChild>
              <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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

      <section>
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Start Your Journey</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Whether you're a beginner or an expert, we have the resources to help you succeed.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {featureCards.map((feature) => (
            <Link href={feature.href} key={feature.title} className="group block">
              <Card className={cn(
                "h-full flex flex-col text-center items-center p-8 transition-all duration-300 bg-card/50 border",
                "hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2",
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
