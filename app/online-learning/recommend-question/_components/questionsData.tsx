import {
  UserCheck,
  Search,
  Puzzle,
  Wrench,
  TrendingUp,
  MessageSquare,
  FileText,
  Database,
  Briefcase,
  Folder,
  BrainCircuit,
  Clock,
  Repeat,
  Smartphone,
  Lock,
  Users,
  Target,
  Lightbulb,
  Handshake,
  Tablet,
  Brain,
  MessagesSquare,
  ClipboardList,
  Video,
  BookOpen,
  UsersRound,
} from "lucide-react";
import { Question } from "./types";

export const questions: Question[] = [
  {
    id: "comfortLevel",
    question: "How would you rate your overall comfort with technology?",
    type: "single",
    options: [
      {
        value: "beginner",
        label:
          'Beginner – "I often feel lost with technology and prefer step-by-step guidance."',
        icon: <UserCheck size={20} className="text-red-800" />,
      },
      {
        value: "developing",
        label:
          'Developing – "I can handle basics but get stuck with anything advanced."',
        icon: <Search size={20} className="text-red-800" />,
      },
      {
        value: "intermediate",
        label:
          'Intermediate – "I\'m comfortable with common features but want to be more efficient."',
        icon: <Puzzle size={20} className="text-red-800" />,
      },
      {
        value: "advanced",
        label:
          'Advanced – "I use technology daily and want to master specific tools."',
        icon: <Wrench size={20} className="text-red-800" />,
      },
      {
        value: "power",
        label:
          'Power User – "I\'m very tech-savvy and looking to optimize my workflow."',
        icon: <TrendingUp size={20} className="text-red-800" />,
      },
    ],
  },
  {
    id: "activities",
    question:
      "What are your primary digital activities? (Select all that apply)",
    type: "multiple",
    options: [
      {
        value: "communication",
        label: "Communication (emails, messaging, video calls)",
        icon: <MessageSquare size={20} className="text-red-800" />,
      },
      {
        value: "contentCreation",
        label: "Content Creation (documents, presentations, spreadsheets)",
        icon: <FileText size={20} className="text-red-800" />,
      },
      {
        value: "dataManagement",
        label: "Data Management (tracking information, calculations, records)",
        icon: <Database size={20} className="text-red-800" />,
      },
      {
        value: "research",
        label: "Research & Learning (finding information, taking courses)",
        icon: <Search size={20} className="text-red-800" />,
      },
      {
        value: "careerDevelopment",
        label: "Career Development (job searching, networking, applications)",
        icon: <Briefcase size={20} className="text-red-800" />,
      },
      {
        value: "fileManagement",
        label: "File Management (organizing, sharing, collaboration)",
        icon: <Folder size={20} className="text-red-800" />,
      },
    ],
  },
  {
    id: "challenges",
    question:
      "What specific challenges do you face with digital tools? (Select all that apply)",
    type: "multiple",
    options: [
      {
        value: "featureOverwhelm",
        label: 'Feature Overwhelm – "Too many options and buttons confuse me."',
        icon: <BrainCircuit size={20} className="text-red-800" />,
      },
      {
        value: "efficiency",
        label: 'Efficiency Issues – "Tasks take me longer than they should."',
        icon: <Clock size={20} className="text-red-800" />,
      },
      {
        value: "workflow",
        label:
          'Workflow Integration – "Moving between different tools is cumbersome."',
        icon: <Repeat size={20} className="text-red-800" />,
      },
      {
        value: "crossDevice",
        label:
          'Cross-device Access – "I struggle using tools across my devices."',
        icon: <Smartphone size={20} className="text-red-800" />,
      },
      {
        value: "rightTool",
        label:
          'Finding the Right Tool – "I\'m not sure which tool best fits my needs."',
        icon: <Puzzle size={20} className="text-red-800" />,
      },
      {
        value: "collaboration",
        label:
          'Collaboration Difficulties – "Sharing and working with others is challenging."',
        icon: <Users size={20} className="text-red-800" />,
      },
      {
        value: "security",
        label:
          'Security Concerns – "I worry about data privacy and protection."',
        icon: <Lock size={20} className="text-red-800" />,
      },
    ],
  },
  {
    id: "goals",
    question: "What are your immediate goals? (Choose top 2)",
    type: "limitedMultiple",
    limit: 2,
    options: [
      {
        value: "productivity",
        label: 'Boost Productivity – "Complete tasks more efficiently."',
        icon: <TrendingUp size={20} className="text-red-800" />,
      },
      {
        value: "jobSuccess",
        label: 'Job Success – "Find and secure employment opportunities."',
        icon: <Target size={20} className="text-red-800" />,
      },
      {
        value: "skillDevelopment",
        label: 'Skill Development – "Learn new digital capabilities."',
        icon: <Lightbulb size={20} className="text-red-800" />,
      },
      {
        value: "collaboration",
        label: 'Better Collaboration – "Work more effectively with others."',
        icon: <Handshake size={20} className="text-red-800" />,
      },
      {
        value: "mobility",
        label: 'Mobility – "Access my work from anywhere."',
        icon: <Tablet size={20} className="text-red-800" />,
      },
      {
        value: "organization",
        label: 'Organization – "Keep track of information more effectively."',
        icon: <Brain size={20} className="text-red-800" />,
      },
      {
        value: "communication",
        label: 'Communication – "Connect more professionally with others."',
        icon: <MessagesSquare size={20} className="text-red-800" />,
      },
    ],
  },
  {
    id: "learningStyle",
    question: "What is your learning preference?",
    type: "single",
    options: [
      {
        value: "stepByStep",
        label:
          'Step-by-step Tutorials – "I like clear instructions I can follow."',
        icon: <ClipboardList size={20} className="text-red-800" />,
      },
      {
        value: "video",
        label: 'Video Demonstrations – "I learn best by watching others."',
        icon: <Video size={20} className="text-red-800" />,
      },
      {
        value: "handson",
        label:
          'Hands-on Practice – "I prefer to learn by doing and experimenting."',
        icon: <Wrench size={20} className="text-red-800" />,
      },
      {
        value: "comprehensive",
        label:
          'Comprehensive Guides – "I want to understand all features and capabilities."',
        icon: <BookOpen size={20} className="text-red-800" />,
      },
      {
        value: "social",
        label:
          'Social Learning – "I learn best with others or from community forums."',
        icon: <UsersRound size={20} className="text-red-800" />,
      },
    ],
  },
];
