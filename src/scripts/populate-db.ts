
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { courses, learningTopics, quizzes, roadmaps, projects } from '../lib/data.js';
import { firebaseConfig } from '../firebase/config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function populate() {
    console.log('Starting database population...');

    // 1. Populate Courses
    console.log('Populating courses...');
    for (const course of courses) {
        await setDoc(doc(db, 'courses', course.id), course);
    }

    // 2. Populate Learning Topics
    console.log('Populating learning topics...');
    for (const topic of learningTopics) {
        await setDoc(doc(db, 'learningTopics', topic.slug), topic);
    }

    // 3. Populate Quizzes
    console.log('Populating quizzes...');
    for (const quiz of quizzes) {
        await setDoc(doc(db, 'quizzes', quiz.slug), quiz);
    }

    // 4. Populate Roadmaps
    console.log('Populating roadmaps...');
    for (const roadmap of roadmaps) {
        await setDoc(doc(db, 'roadmaps', roadmap.id), roadmap);
    }

    // 5. Populate Projects
    console.log('Populating projects...');
    for (const project of projects) {
        await setDoc(doc(db, 'projects', project.id), project);
    }

    console.log('Database population complete!');
}

populate().catch(console.error);
