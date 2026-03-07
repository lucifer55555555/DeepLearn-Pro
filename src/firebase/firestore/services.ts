
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    setDoc,
    updateDoc,
    Timestamp
} from 'firebase/firestore';
import { initializeFirebase } from '../index';
import type { Course, Quiz, LearningTopic, Roadmap, Project } from '../../lib/data';

const { firestore } = initializeFirebase();
import * as staticData from '../../lib/data';

export const firestoreService = {
    // Courses
    async getCourses() {
        return staticData.courses;
    },

    async getCourse(id: string) {
        return staticData.courses.find(c => c.id === id) || null;
    },

    // Learning Topics
    async getLearningTopic(slug: string) {
        return staticData.learningTopics.find(t => t.slug === slug) || null;
    },

    // Quizzes
    async getQuizzes() {
        return staticData.quizzes;
    },

    async getQuiz(slug: string) {
        return staticData.quizzes.find(q => q.slug === slug) || null;
    },

    // Roadmaps
    async getRoadmaps() {
        return staticData.roadmaps;
    },

    // Projects
    async getProjects() {
        return staticData.projects;
    },

    async getProject(id: string) {
        return staticData.projects.find(p => p.id === id) || null;
    },

    // User Progress
    async saveUserProgress(userId: string, courseId: string, progress: number) {
        const docRef = doc(firestore, 'userProgress', `${userId}_${courseId}`);
        await setDoc(docRef, {
            userId,
            courseId,
            progress,
            lastUpdated: Timestamp.now()
        }, { merge: true });
    },

    async getUserProgress(userId: string, courseId: string) {
        const docRef = doc(firestore, 'userProgress', `${userId}_${courseId}`);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().progress : 0;
    }
};
