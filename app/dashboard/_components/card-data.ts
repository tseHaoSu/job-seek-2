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
  LucideIcon,
  Clipboard,
  Award,
  Lightbulb,
  Monitor,
  Laptop,
  LifeBuoy,
  PenTool,
  FileSpreadsheet,
  Presentation,
  VideoIcon,
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
    title: "Tools Guide",
    description: "Discover the tools you need to succeed in your job search",
    url: "/online-learning/tool-selection",
    icon: Clipboard,
  },
  {
    id: 2,
    title: "Tools Recommendation",
    description: "Get personalized tool recommendations based on your needs",
    url: "/ai-support",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "Office Productivity",
    description: "Learn the best practices for using office software",
    url: "/online-learning/1",
    icon: Laptop,
  },
  {
    id: 4,
    title: "Communication",
    description: "Learn effective communication software skills",
    url: "/online-learning/2",
    icon: MessageSquare,
  },
  {
    id: 5,
    title: "Job platforms guidance",
    description: "Get tips and tricks for using job platforms effectively",
    url: "/online-learning/3",
    icon: Briefcase,
    hidden: true,
  },
  {
    id: 6,
    title: "Resume Guidance AI",
    description: "Access AI-powered resume guidance",
    url: "/career-support/resume-support",
    icon: FileText,
    hidden: true,
  },
  {
    id: 7,
    title: "Excel Quiz",
    description: "Test out your Excel skills!",
    url: "/quizzes/17",
    icon: FileSpreadsheet,
    hidden: true,
  },
  {
    id: 8,
    title: "Word Quiz",
    description: "Test out your Word skills!",
    url: "/quizzes/15",
    icon: Book,
    hidden: true,
  },
  {
    id: 9,
    title: "PowerPoint Quiz",
    description: "Test out your Powerpoint skills!",
    url: "/quizzes/16",
    icon: Presentation,
    hidden: true,
  },
  {
    id: 10,
    title: "Teams Quiz",
    description: "Test out your Teams skills!",
    url: "/quizzes/19",
    icon: Users,
    hidden: true,
  },
  {
    id: 11,
    title: "Zoom Quiz",
    description: "Test out your Zoom skills!",
    url: "/quizzes/18",
    icon: VideoIcon,
    hidden: true,
  },
];
