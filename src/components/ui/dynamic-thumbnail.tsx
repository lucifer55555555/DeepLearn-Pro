'use client';

import { cn } from '@/lib/utils';
import { Brain, Cpu, Eye, MessageSquare, HeartPulse, Hash, Sparkles, type LucideIcon } from 'lucide-react';

type ThumbnailVariant =
    | 'ml-foundations'
    | 'dl-fundamentals'
    | 'cv-mastery'
    | 'nlp-expert'
    | 'sentiment-analyzer'
    | 'digit-recognizer'
    | 'default';

interface DynamicThumbnailProps {
    variant: ThumbnailVariant;
    className?: string;
}

type VariantConfig = {
    icon: LucideIcon;
    label: string;
    gradient: string;
    accentColor: string;
    glowColor: string;
    particleColors: string[];
};

const variants: Record<ThumbnailVariant, VariantConfig> = {
    'ml-foundations': {
        icon: Brain,
        label: 'Machine Learning',
        gradient: 'from-blue-600 via-cyan-500 to-sky-400',
        accentColor: 'text-cyan-200',
        glowColor: 'shadow-cyan-500/50',
        particleColors: ['bg-cyan-300', 'bg-blue-300', 'bg-sky-200'],
    },
    'dl-fundamentals': {
        icon: Cpu,
        label: 'Deep Learning',
        gradient: 'from-purple-600 via-fuchsia-500 to-pink-400',
        accentColor: 'text-pink-200',
        glowColor: 'shadow-purple-500/50',
        particleColors: ['bg-purple-300', 'bg-fuchsia-300', 'bg-pink-200'],
    },
    'cv-mastery': {
        icon: Eye,
        label: 'Computer Vision',
        gradient: 'from-emerald-600 via-green-500 to-teal-400',
        accentColor: 'text-emerald-200',
        glowColor: 'shadow-emerald-500/50',
        particleColors: ['bg-emerald-300', 'bg-green-300', 'bg-teal-200'],
    },
    'nlp-expert': {
        icon: MessageSquare,
        label: 'NLP',
        gradient: 'from-orange-500 via-amber-500 to-yellow-400',
        accentColor: 'text-amber-200',
        glowColor: 'shadow-amber-500/50',
        particleColors: ['bg-orange-300', 'bg-amber-300', 'bg-yellow-200'],
    },
    'sentiment-analyzer': {
        icon: HeartPulse,
        label: 'Sentiment Analysis',
        gradient: 'from-rose-600 via-pink-500 to-fuchsia-400',
        accentColor: 'text-rose-200',
        glowColor: 'shadow-rose-500/50',
        particleColors: ['bg-rose-300', 'bg-pink-300', 'bg-fuchsia-200'],
    },
    'digit-recognizer': {
        icon: Hash,
        label: 'Digit Recognition',
        gradient: 'from-indigo-600 via-violet-500 to-purple-400',
        accentColor: 'text-violet-200',
        glowColor: 'shadow-indigo-500/50',
        particleColors: ['bg-indigo-300', 'bg-violet-300', 'bg-purple-200'],
    },
    default: {
        icon: Sparkles,
        label: 'AI',
        gradient: 'from-slate-600 via-gray-500 to-zinc-400',
        accentColor: 'text-slate-200',
        glowColor: 'shadow-slate-500/50',
        particleColors: ['bg-slate-300', 'bg-gray-300', 'bg-zinc-200'],
    },
};

// Map imageId values from the data to our variant keys
const imageIdToVariant: Record<string, ThumbnailVariant> = {
    'course-ml-foundations': 'ml-foundations',
    'course-dl-fundamentals': 'dl-fundamentals',
    'course-cv-mastery': 'cv-mastery',
    'course-nlp-expert': 'nlp-expert',
    'project-sentiment-analyzer': 'sentiment-analyzer',
    'project-digit-recognizer': 'digit-recognizer',
    'course-supervised-ml': 'ml-foundations',
    'course-advanced-algos': 'dl-fundamentals',
    'course-unsupervised': 'ml-foundations',
    'course-dl-foundations': 'dl-fundamentals',
    'project-linear-scratch': 'ml-foundations',
    'project-deep-nn': 'dl-fundamentals',
};

export function getVariantFromImageId(imageId: string): ThumbnailVariant {
    return imageIdToVariant[imageId] ?? 'default';
}

export function DynamicThumbnail({ variant, className }: DynamicThumbnailProps) {
    const config = variants[variant] ?? variants.default;
    const Icon = config.icon;

    return (
        <div
            className={cn(
                'relative w-full h-full overflow-hidden select-none',
                className
            )}
        >
            {/* Animated gradient background */}
            <div
                className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-90',
                    config.gradient
                )}
                style={{ animation: 'gradientShift 8s ease infinite alternate' }}
            />

            {/* Subtle mesh overlay */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Floating particles */}
            {config.particleColors.map((color, i) => (
                <div key={i}>
                    {/* Large slow orb */}
                    <div
                        className={cn(
                            'absolute rounded-full opacity-30 blur-sm',
                            color
                        )}
                        style={{
                            width: `${50 + i * 20}px`,
                            height: `${50 + i * 20}px`,
                            top: `${10 + i * 25}%`,
                            left: `${15 + i * 30}%`,
                            animation: `float${i} ${6 + i * 2}s ease-in-out infinite`,
                        }}
                    />
                    {/* Small sharp dot */}
                    <div
                        className={cn(
                            'absolute rounded-full opacity-60',
                            color
                        )}
                        style={{
                            width: `${6 + i * 2}px`,
                            height: `${6 + i * 2}px`,
                            top: `${60 - i * 20}%`,
                            left: `${70 - i * 25}%`,
                            animation: `float${(i + 2) % 3} ${4 + i}s ease-in-out infinite`,
                        }}
                    />
                </div>
            ))}

            {/* Geometric ring accent */}
            <div
                className="absolute border-2 border-white/10 rounded-full"
                style={{
                    width: '140px',
                    height: '140px',
                    top: '-30px',
                    right: '-30px',
                    animation: 'spin 20s linear infinite',
                }}
            />
            <div
                className="absolute border border-white/5 rounded-full"
                style={{
                    width: '100px',
                    height: '100px',
                    bottom: '-20px',
                    left: '-20px',
                    animation: 'spin 25s linear infinite reverse',
                }}
            />

            {/* Center icon with glow */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                <div
                    className={cn(
                        'p-4 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg',
                        config.glowColor
                    )}
                    style={{
                        animation: 'pulse-glow 3s ease-in-out infinite',
                    }}
                >
                    <Icon className={cn('w-10 h-10', config.accentColor)} strokeWidth={1.5} />
                </div>
                <span className="text-white/80 text-xs font-medium tracking-wider uppercase mt-1">
                    {config.label}
                </span>
            </div>

            {/* Bottom fade to card background */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes gradientShift {
          0% { filter: hue-rotate(0deg) brightness(1); }
          100% { filter: hue-rotate(15deg) brightness(1.1); }
        }
        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -20px) scale(1.1); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 15px) scale(0.9); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 10px) scale(1.15); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(255,255,255,0.1); transform: scale(1); }
          50% { box-shadow: 0 0 30px rgba(255,255,255,0.2); transform: scale(1.05); }
        }
      `}</style>
        </div>
    );
}
