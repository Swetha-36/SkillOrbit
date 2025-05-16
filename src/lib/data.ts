
import { Course, Hackathon, LeaderboardEntry, CourseProgress, User } from './types';

// Mock current user
export const currentUser: User = {
  id: 1,
  name: "Alex Johnson",
  email: "alex@example.com",
  points: 215,
  completedLevels: [1, 2, 4, 7, 9],
  completedQuizzes: [1, 2]
};

// Mock courses data
export const coursesData: Course[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the core technologies that power the web: HTML, CSS, and JavaScript.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500",
    levelCount: 5,
    levels: [
      {
        id: 1,
        courseId: 1,
        title: "HTML Basics",
        description: "Learn the fundamental building blocks of web pages.",
        order: 1,
        resources: [
          {
            id: 101,
            title: "HTML Introduction",
            type: "video",
            url: "https://www.youtube.com/watch?v=UB1O30fR-EE"
          },
          {
            id: 102,
            title: "HTML Comprehensive Guide",
            type: "article",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
          }
        ],
        quiz: {
          id: 1,
          levelId: 1,
          title: "HTML Basics Quiz",
          questions: [
            {
              id: 1,
              text: "What does HTML stand for?",
              options: [
                "Hyper Text Markup Language",
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language",
                "Hyper Text Making Language"
              ],
              correctOptionIndex: 0
            },
            {
              id: 2,
              text: "Which HTML element defines the title of a document?",
              options: ["<meta>", "<head>", "<title>", "<header>"],
              correctOptionIndex: 2
            }
          ]
        }
      },
      {
        id: 2,
        courseId: 1,
        title: "CSS Styling",
        description: "Learn how to style web pages with CSS.",
        order: 2,
        resources: [
          {
            id: 201,
            title: "CSS Crash Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=yfoY53QXEnI"
          },
          {
            id: 202,
            title: "CSS Tricks",
            type: "article",
            url: "https://css-tricks.com/guides/"
          }
        ],
        quiz: {
          id: 2,
          levelId: 2,
          title: "CSS Styling Quiz",
          questions: [
            {
              id: 3,
              text: "Which property is used to change the background color?",
              options: ["color", "bgcolor", "background-color", "background"],
              correctOptionIndex: 2
            },
            {
              id: 4,
              text: "Which CSS property controls the text size?",
              options: ["font-style", "text-size", "font-size", "text-style"],
              correctOptionIndex: 2
            }
          ]
        }
      },
      {
        id: 3,
        courseId: 1,
        title: "JavaScript Basics",
        description: "Learn the fundamentals of JavaScript programming.",
        order: 3,
        resources: [
          {
            id: 301,
            title: "JavaScript Crash Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=hdI2bqOjy3c"
          },
          {
            id: 302,
            title: "JavaScript Guide",
            type: "documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          }
        ],
        quiz: null
      },
      {
        id: 4,
        courseId: 1,
        title: "Responsive Design",
        description: "Learn how to make websites that look good on all devices.",
        order: 4,
        resources: [
          {
            id: 401,
            title: "Responsive Web Design Tutorial",
            type: "video",
            url: "https://www.youtube.com/watch?v=fgOO9YUFlGI"
          }
        ],
        quiz: null
      },
      {
        id: 5,
        courseId: 1,
        title: "Web Accessibility",
        description: "Learn how to make websites accessible to all users.",
        order: 5,
        resources: [
          {
            id: 501,
            title: "Web Accessibility Introduction",
            type: "article",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility"
          }
        ],
        quiz: null
      }
    ]
  },
  {
    id: 2,
    title: "Java Programming Mastery",
    description: "Master Java programming from basics to advanced concepts.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500",
    levelCount: 4,
    levels: [
      {
        id: 6,
        courseId: 2,
        title: "Java Fundamentals",
        description: "Learn the basics of Java programming.",
        order: 1,
        resources: [
          {
            id: 601,
            title: "Java Tutorial for Beginners",
            type: "video",
            url: "https://www.youtube.com/watch?v=eIrMbAQSU34"
          }
        ],
        quiz: null
      },
      {
        id: 7,
        courseId: 2,
        title: "Object-Oriented Programming in Java",
        description: "Learn object-oriented programming principles with Java.",
        order: 2,
        resources: [
          {
            id: 701,
            title: "Java OOP Concepts",
            type: "article",
            url: "https://www.javatpoint.com/java-oops-concepts"
          }
        ],
        quiz: null
      },
      {
        id: 8,
        courseId: 2,
        title: "Java Collections Framework",
        description: "Learn about Java's built-in data structures.",
        order: 3,
        resources: [],
        quiz: null
      },
      {
        id: 9,
        courseId: 2,
        title: "Java Streams and Lambdas",
        description: "Learn functional programming in Java.",
        order: 4,
        resources: [],
        quiz: null
      }
    ]
  },
  {
    id: 3,
    title: "Spring Boot Essentials",
    description: "Learn Spring Boot for building Java applications.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=500",
    levelCount: 3,
    levels: [
      {
        id: 10,
        courseId: 3,
        title: "Spring Boot Introduction",
        description: "Get started with Spring Boot.",
        order: 1,
        resources: [],
        quiz: null
      },
      {
        id: 11,
        courseId: 3,
        title: "RESTful APIs with Spring Boot",
        description: "Learn to build RESTful APIs with Spring Boot.",
        order: 2,
        resources: [],
        quiz: null
      },
      {
        id: 12,
        courseId: 3,
        title: "Spring Data JPA",
        description: "Learn database operations with Spring Data JPA.",
        order: 3,
        resources: [],
        quiz: null
      }
    ]
  }
];

// Mock hackathons data
export const hackathonsData: Hackathon[] = [
  {
    id: 1,
    name: "CodeFest 2025",
    description: "A 48-hour hackathon focused on building innovative solutions for education.",
    date: "2025-07-15",
    registrationUrl: "https://example.com/codefest",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=500",
    location: "Virtual"
  },
  {
    id: 2,
    name: "HealthTech Hackathon",
    description: "Build healthcare solutions using cutting-edge technologies.",
    date: "2025-08-10",
    registrationUrl: "https://example.com/healthtech",
    location: "New York, NY"
  },
  {
    id: 3,
    name: "AI Revolution",
    description: "Create AI-powered applications that solve real-world problems.",
    date: "2025-09-05",
    registrationUrl: "https://example.com/airevolution",
    location: "San Francisco, CA"
  },
  {
    id: 4,
    name: "Global Climate Hack",
    description: "Develop solutions to combat climate change.",
    date: "2025-10-20",
    registrationUrl: "https://example.com/climatehack",
    location: "Berlin, Germany"
  }
];

// Mock leaderboard data
export const leaderboardData: LeaderboardEntry[] = [
  {
    id: 5,
    name: "Sarah Chen",
    points: 380,
    rank: 1,
    avatarUrl: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    points: 345,
    rank: 2,
    avatarUrl: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 9,
    name: "Priya Sharma",
    points: 320,
    rank: 3,
    avatarUrl: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 1,
    name: "Alex Johnson",
    points: 215,
    rank: 4,
    avatarUrl: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 7,
    name: "David Kim",
    points: 180,
    rank: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=8"
  }
];

// Mock course progress data for the current user
export const userProgressData: CourseProgress[] = [
  {
    courseId: 1,
    courseTitle: "Web Development Fundamentals",
    totalLevels: 5,
    completedLevels: 3,
    earnedPoints: 95,
    progressPercentage: 60
  },
  {
    courseId: 2,
    courseTitle: "Java Programming Mastery",
    totalLevels: 4,
    completedLevels: 2,
    earnedPoints: 85,
    progressPercentage: 50
  },
  {
    courseId: 3,
    courseTitle: "Spring Boot Essentials",
    totalLevels: 3,
    completedLevels: 0,
    earnedPoints: 0,
    progressPercentage: 0
  }
];
