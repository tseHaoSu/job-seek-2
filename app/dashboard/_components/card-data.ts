import {
  BarChart,
  Book,
  Briefcase,
  CalendarDays,
  FileText,
  GraduationCap,
  MessageSquare,
  Users,
  Video,
} from "lucide-react";

export interface CardData {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
  pinned?: boolean;
  hidden?: boolean;
}

export const cards = [
  // Initial visible cards
  {
    id: 1,
    title: "Resume Builder",
    description:
      "Create a professional resume with our easy-to-use templates. Get started with our AI-powered resume builder that helps you stand out from the crowd.",
    url: "/tools/resume",
    icon: FileText,
  },
  {
    id: 2,
    title: "Interview Prep",
    description: "Practice common interview questions and get feedback",
    url: "/tools/interview",
    icon: Users,
  },
  {
    id: 3,
    title: "Skill Courses",
    description: "Enhance your skills with our curated learning paths",
    url: "/tools/courses",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Job Tracker",
    description: "Organize your job applications and track your progress",
    url: "/tools/job-tracker",
    icon: Briefcase,
  },
  {
    id: 5,
    title: "Tutorial Videos",
    description:
      "Watch helpful tutorials on job searching and career development",
    url: "/tools/videos",
    icon: Video,
  },
  {
    id: 6,
    title: "Career Resources",
    description:
      "Access our library of articles and guides for career advancement",
    url: "/tools/resources",
    icon: Book,
  },

  // Additional hidden cards
  
  {
    id: 7,
    title: "Event Calendar",
    description:
      "Stay updated with upcoming career fairs and networking events",
    url: "/tools/events",
    icon: CalendarDays,
    hidden: true,
  },
  {
    id: 8,
    title: "Mentorship",
    description:
      "Connect with industry professionals for guidance and advice. Get matched with mentors in your field who can provide personalized career coaching.",
    url: "/tools/mentorship",
    icon: MessageSquare,
    hidden: true,
  },
  {
    id: 9,
    title: "Career Analytics",
    description:
      "View insights and trends to optimize your job search strategy",
    url: "/tools/analytics",
    icon: BarChart,
    hidden: true,
  },
];
