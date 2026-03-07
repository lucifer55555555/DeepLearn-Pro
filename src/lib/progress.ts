
/**
 * Enhanced local progress utility for tracking user activity.
 * Supports mastery tracking, streaks, time tracking, and weak-area detection.
 */

const STORAGE_KEY = 'deeplearn_pro_progress';

export interface TopicMastery {
    topicSlug: string;
    topicName: string;
    score: number; // 0-100
    quizzesTaken: number;
    lastUpdated: string;
}

export interface DailyActivity {
    date: string; // YYYY-MM-DD
    minutesSpent: number;
    coursesCompleted: number;
    quizzesCompleted: number;
    projectsSolved: number;
}

export interface LocalProgress {
    completedCourseIds: string[];
    completedQuizIds: string[];
    quizScores: Record<string, number>;
    solvedProjectIds: string[];
    lastVisitedPath: string;
    lastVisitedTitle: string;
    // New fields
    topicMastery: TopicMastery[];
    learningStreakDays: number;
    lastActiveDate: string;
    totalTimeSpentMinutes: number;
    dailyActivity: DailyActivity[];
    sessionStartTime: number | null;
}

const defaultProgress: LocalProgress = {
    completedCourseIds: [],
    completedQuizIds: [],
    quizScores: {},
    solvedProjectIds: [],
    lastVisitedPath: '/',
    lastVisitedTitle: 'Home',
    topicMastery: [
        { topicSlug: 'intro-to-ml', topicName: 'Machine Learning', score: 0, quizzesTaken: 0, lastUpdated: '' },
        { topicSlug: 'neural-networks', topicName: 'Neural Networks', score: 0, quizzesTaken: 0, lastUpdated: '' },
        { topicSlug: 'computer-vision', topicName: 'Computer Vision', score: 0, quizzesTaken: 0, lastUpdated: '' },
        { topicSlug: 'natural-language-processing', topicName: 'NLP', score: 0, quizzesTaken: 0, lastUpdated: '' },
    ],
    learningStreakDays: 0,
    lastActiveDate: '',
    totalTimeSpentMinutes: 0,
    dailyActivity: [],
    sessionStartTime: null,
};

const today = () => new Date().toISOString().split('T')[0];

export const progressStorage = {
    get: (): LocalProgress => {
        if (typeof window === 'undefined') return defaultProgress;
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return defaultProgress;
        try {
            const parsed = JSON.parse(data);
            // Merge with defaults for backwards compat
            return { ...defaultProgress, ...parsed };
        } catch (e) {
            console.error('Failed to parse local progress:', e);
            return defaultProgress;
        }
    },

    save: (progress: LocalProgress) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    },

    completeCourse: (courseId: string) => {
        const progress = progressStorage.get();
        if (!progress.completedCourseIds.includes(courseId)) {
            progress.completedCourseIds.push(courseId);
            progressStorage._addDailyActivity(progress, { coursesCompleted: 1 });
            progressStorage.save(progress);
        }
    },

    completeQuiz: (quizId: string, score: number, topicSlug?: string) => {
        const progress = progressStorage.get();
        if (!progress.completedQuizIds.includes(quizId)) {
            progress.completedQuizIds.push(quizId);
        }
        progress.quizScores[quizId] = Math.max(progress.quizScores[quizId] || 0, score);

        // Update topic mastery
        if (topicSlug) {
            const topic = progress.topicMastery.find(t => t.topicSlug === topicSlug);
            if (topic) {
                // Running average weighted towards recent performance
                topic.score = topic.quizzesTaken === 0
                    ? score
                    : Math.round((topic.score * topic.quizzesTaken + score) / (topic.quizzesTaken + 1));
                topic.quizzesTaken += 1;
                topic.lastUpdated = today();
            }
        }

        progressStorage._addDailyActivity(progress, { quizzesCompleted: 1 });
        progressStorage.save(progress);
    },

    solveProject: (projectId: string) => {
        const progress = progressStorage.get();
        if (!progress.solvedProjectIds.includes(projectId)) {
            progress.solvedProjectIds.push(projectId);
            progressStorage._addDailyActivity(progress, { projectsSolved: 1 });
            progressStorage.save(progress);
        }
    },

    trackVisit: (path: string, title: string) => {
        const progress = progressStorage.get();
        progress.lastVisitedPath = path;
        progress.lastVisitedTitle = title;
        progressStorage._updateStreak(progress);
        progressStorage.save(progress);
    },

    startSession: () => {
        const progress = progressStorage.get();
        progress.sessionStartTime = Date.now();
        progressStorage.save(progress);
    },

    endSession: () => {
        const progress = progressStorage.get();
        if (progress.sessionStartTime) {
            const minutes = Math.round((Date.now() - progress.sessionStartTime) / 60000);
            progress.totalTimeSpentMinutes += minutes;
            progressStorage._addDailyActivity(progress, { minutesSpent: minutes });
            progress.sessionStartTime = null;
            progressStorage.save(progress);
        }
    },

    getWeakTopics: (): TopicMastery[] => {
        const progress = progressStorage.get();
        return progress.topicMastery.filter(t => t.score > 0 && t.score < 60);
    },

    getStrongestTopic: (): TopicMastery | null => {
        const progress = progressStorage.get();
        const scored = progress.topicMastery.filter(t => t.score > 0);
        if (scored.length === 0) return null;
        return scored.reduce((best, t) => t.score > best.score ? t : best);
    },

    getOverallMastery: (): number => {
        const progress = progressStorage.get();
        const scored = progress.topicMastery.filter(t => t.score > 0);
        if (scored.length === 0) return 0;
        return Math.round(scored.reduce((sum, t) => sum + t.score, 0) / scored.length);
    },

    // Internal helpers
    _updateStreak: (progress: LocalProgress) => {
        const todayStr = today();
        if (progress.lastActiveDate === todayStr) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (progress.lastActiveDate === yesterdayStr) {
            progress.learningStreakDays += 1;
        } else if (progress.lastActiveDate !== todayStr) {
            progress.learningStreakDays = 1;
        }
        progress.lastActiveDate = todayStr;
    },

    _addDailyActivity: (progress: LocalProgress, update: Partial<Omit<DailyActivity, 'date'>>) => {
        const todayStr = today();
        let todayActivity = progress.dailyActivity.find(a => a.date === todayStr);
        if (!todayActivity) {
            todayActivity = { date: todayStr, minutesSpent: 0, coursesCompleted: 0, quizzesCompleted: 0, projectsSolved: 0 };
            progress.dailyActivity.push(todayActivity);
        }
        if (update.minutesSpent) todayActivity.minutesSpent += update.minutesSpent;
        if (update.coursesCompleted) todayActivity.coursesCompleted += update.coursesCompleted;
        if (update.quizzesCompleted) todayActivity.quizzesCompleted += update.quizzesCompleted;
        if (update.projectsSolved) todayActivity.projectsSolved += update.projectsSolved;

        // Keep only last 90 days
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 90);
        const cutoffStr = cutoff.toISOString().split('T')[0];
        progress.dailyActivity = progress.dailyActivity.filter(a => a.date >= cutoffStr);

        progressStorage._updateStreak(progress);
    },
};
