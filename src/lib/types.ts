
// Type definitions for SkillSprint application

export interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  completedLevels: number[];
  completedQuizzes: number[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  levelCount: number;
  levels: Level[];
}

export interface Level {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  resources: Resource[];
  quiz: Quiz | null;
}

export interface Resource {
  id: number;
  title: string;
  type: "video" | "article" | "documentation";
  url: string;
}

export interface Quiz {
  id: number;
  levelId: number;
  title: string;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Hackathon {
  id: number;
  name: string;
  description: string;
  date: string;
  registrationUrl: string;
  image?: string;
  location?: string;
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  points: number;
  rank: number;
  avatarUrl?: string;
}

export interface CourseProgress {
  courseId: number;
  courseTitle: string;
  totalLevels: number;
  completedLevels: number;
  earnedPoints: number;
  progressPercentage: number;
}
