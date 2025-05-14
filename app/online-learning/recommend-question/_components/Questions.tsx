"use client";

import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Brain,
  BrainCircuit,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Database,
  FileText,
  Folder,
  Handshake,
  Lightbulb,
  Lock,
  MessageSquare,
  MessagesSquare,
  Puzzle,
  Repeat,
  Search,
  Smartphone,
  Tablet,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  UsersRound,
  Video,
  Wrench,
} from "lucide-react";
import { useState } from "react";

// Define types for our data structures
type ComfortLevel =
  | "beginner"
  | "developing"
  | "intermediate"
  | "advanced"
  | "power";
type Activity =
  | "communication"
  | "contentCreation"
  | "dataManagement"
  | "research"
  | "careerDevelopment"
  | "fileManagement";
type Challenge =
  | "featureOverwhelm"
  | "efficiency"
  | "workflow"
  | "crossDevice"
  | "rightTool"
  | "collaboration"
  | "security";
type Goal =
  | "productivity"
  | "jobSuccess"
  | "skillDevelopment"
  | "collaboration"
  | "mobility"
  | "organization"
  | "communication";
type LearningStyle =
  | "stepByStep"
  | "video"
  | "handson"
  | "comprehensive"
  | "social";

type QuestionOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

interface BaseQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
}

interface SingleSelectQuestion extends BaseQuestion {
  type: "single";
}

interface MultipleSelectQuestion extends BaseQuestion {
  type: "multiple";
}

interface LimitedMultipleSelectQuestion extends BaseQuestion {
  type: "limitedMultiple";
  limit: number;
}

type Question =
  | SingleSelectQuestion
  | MultipleSelectQuestion
  | LimitedMultipleSelectQuestion;

interface AnswersState {
  comfortLevel: ComfortLevel | "";
  activities: Activity[];
  challenges: Challenge[];
  goals: Goal[];
  learningStyle: LearningStyle | "";
}

interface Tool {
  name: string;
  description: string;
  priority: "primary" | "secondary";
}

type PersonaType =
  | "Navigator"
  | "Career Builder"
  | "Content Creator"
  | "Connector"
  | "Data Manager";

const Questions = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersState>({
    comfortLevel: "",
    activities: [],
    challenges: [],
    goals: [],
    learningStyle: "",
  });
  const [showResults, setShowResults] = useState<boolean>(false);
  const [recommendedTools, setRecommendedTools] = useState<Tool[]>([]);
  const [userPersona, setUserPersona] = useState<PersonaType | "">("");

  const { toast } = useToast();

  const questions: Question[] = [
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
          label:
            "Data Management (tracking information, calculations, records)",
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
          label:
            'Feature Overwhelm – "Too many options and buttons confuse me."',
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

  const handleSingleSelect = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value as any, // Using type assertion since we know the values match our types
    });
  };

  const handleMultipleSelect = (questionId: string, value: string) => {
    const currentSelections =
      (answers[questionId as keyof AnswersState] as string[]) || [];
    const newSelections = currentSelections.includes(value)
      ? currentSelections.filter((item) => item !== value)
      : [...currentSelections, value];

    setAnswers({
      ...answers,
      [questionId]: newSelections as any, // Using type assertion since we know the values match our types
    });
  };

  const handleLimitedMultipleSelect = (
    questionId: string,
    value: string,
    limit: number
  ) => {
    const currentSelections =
      (answers[questionId as keyof AnswersState] as string[]) || [];

    // If already selected, remove it
    if (currentSelections.includes(value)) {
      setAnswers({
        ...answers,
        [questionId]: currentSelections.filter((item) => item !== value) as any,
      });
      return;
    }

    // If not selected and under limit, add it
    if (currentSelections.length < limit) {
      setAnswers({
        ...answers,
        [questionId]: [...currentSelections, value] as any,
      });
    }
  };

  const nextStep = () => {
    const currentQuestion = questions[currentStep];

    // Validate current question has an answer
    if (
      currentQuestion.type === "single" &&
      !answers[currentQuestion.id as keyof AnswersState]
    ) {
      toast({
        title: "Selection Required",
        description: "Please select an option before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (
      (currentQuestion.type === "multiple" ||
        currentQuestion.type === "limitedMultiple") &&
      (!answers[currentQuestion.id as keyof AnswersState] ||
        (answers[currentQuestion.id as keyof AnswersState] as unknown as any[])
          .length === 0)
    ) {
      toast({
        title: "Selection Required",
        description: "Please select at least one option before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (
      currentQuestion.type === "limitedMultiple" &&
      (answers[currentQuestion.id as keyof AnswersState] as unknown as any[])
        .length !== currentQuestion.limit
    ) {
      toast({
        title: "Selection Limit",
        description: `Please select exactly ${currentQuestion.limit} options.`,
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last question answered, calculate results
      calculateResults();
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResults = () => {
    // Calculate user persona
    const persona = determinePersona();
    setUserPersona(persona);

    // Calculate recommended tools
    const tools = determineTools(persona);
    setRecommendedTools(tools);
  };

  const determinePersona = (): PersonaType => {
    // Basic algorithm to determine persona based on answers
    const { comfortLevel, activities, goals, learningStyle } = answers;

    // Navigator: beginners who need guidance
    if (
      ["beginner", "developing"].includes(comfortLevel as string) &&
      ["stepByStep", "video"].includes(learningStyle as string)
    ) {
      return "Navigator";
    }

    // Career Builder: focused on job hunting
    if (
      activities.includes("careerDevelopment" as Activity) &&
      goals.includes("jobSuccess" as Goal)
    ) {
      return "Career Builder";
    }

    // Content Creator: focuses on document creation
    if (
      activities.includes("contentCreation" as Activity) &&
      (goals.includes("productivity" as Goal) ||
        goals.includes("organization" as Goal))
    ) {
      return "Content Creator";
    }

    // Connector: communication-focused
    if (
      activities.includes("communication" as Activity) &&
      (goals.includes("communication" as Goal) ||
        goals.includes("collaboration" as Goal))
    ) {
      return "Connector";
    }

    // Data Manager: works with spreadsheets and information
    if (
      activities.includes("dataManagement" as Activity) &&
      (goals.includes("organization" as Goal) ||
        goals.includes("productivity" as Goal))
    ) {
      return "Data Manager";
    }

    // Default to Navigator if no clear match
    return "Navigator";
  };

  const determineTools = (persona: PersonaType): Tool[] => {
    // Tool recommendations based on persona
    const toolSets: Record<PersonaType, Tool[]> = {
      Navigator: [
        {
          name: "Gmail",
          description: "Easy-to-use email platform for beginners",
          priority: "primary",
        },
        {
          name: "Word",
          description: "Create simple documents with intuitive interface",
          priority: "primary",
        },
        {
          name: "Acrobat Reader",
          description: "View PDF files without complexity",
          priority: "primary",
        },
        {
          name: "Teams",
          description: "Join meetings with minimal setup",
          priority: "secondary",
        },
      ],
      "Career Builder": [
        {
          name: "LinkedIn",
          description: "Network and discover job opportunities",
          priority: "primary",
        },
        {
          name: "SEEK",
          description: "Search and apply for jobs efficiently",
          priority: "primary",
        },
        {
          name: "Gmail",
          description: "Maintain professional communications",
          priority: "primary",
        },
        {
          name: "Word",
          description: "Create standout resumes and cover letters",
          priority: "secondary",
        },
        {
          name: "PowerPoint",
          description: "Build impressive portfolios and presentations",
          priority: "secondary",
        },
      ],
      "Content Creator": [
        {
          name: "Word",
          description: "Create professional documents with advanced formatting",
          priority: "primary",
        },
        {
          name: "PowerPoint",
          description: "Design impactful presentations",
          priority: "primary",
        },
        {
          name: "Excel",
          description: "Organize data and create visualizations",
          priority: "primary",
        },
        {
          name: "Acrobat Pro",
          description: "Create and edit professional PDF documents",
          priority: "secondary",
        },
      ],
      Connector: [
        {
          name: "Gmail",
          description: "Manage communications efficiently",
          priority: "primary",
        },
        {
          name: "Teams",
          description: "Collaborate with teammates in real-time",
          priority: "primary",
        },
        {
          name: "Zoom",
          description: "Host and join professional video meetings",
          priority: "primary",
        },
        {
          name: "Word",
          description: "Collaborate on shared documents",
          priority: "secondary",
        },
      ],
      "Data Manager": [
        {
          name: "Excel",
          description: "Analyze and visualize data effectively",
          priority: "primary",
        },
        {
          name: "Acrobat Pro",
          description: "Manage and secure important documents",
          priority: "primary",
        },
        {
          name: "Word",
          description: "Create reports from your data analysis",
          priority: "secondary",
        },
      ],
    };

    return toolSets[persona] || toolSets["Navigator"];
  };

  const restartAssessment = () => {
    setCurrentStep(0);
    setAnswers({
      comfortLevel: "",
      activities: [],
      challenges: [],
      goals: [],
      learningStyle: "",
    });
    setShowResults(false);
    setRecommendedTools([]);
    setUserPersona("");

    toast({
      title: "Assessment Restarted",
      description: "You can now start a new assessment.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="p-8">
        {!showResults ? (
          <>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-red-700 mb-4">
                {questions[currentStep].question}
              </h3>

              <div className="space-y-3">
                {questions[currentStep].options.map((option) => {
                  const questionId = questions[currentStep]
                    .id as keyof AnswersState;
                  const answer = answers[questionId];

                  const isSelected =
                    questions[currentStep].type === "single"
                      ? answer === option.value
                      : Array.isArray(answer) &&
                        (answer as string[]).includes(option.value);

                  return (
                    <div
                      key={option.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        if (questions[currentStep].type === "single") {
                          handleSingleSelect(
                            questions[currentStep].id,
                            option.value
                          );
                        } else if (
                          questions[currentStep].type === "limitedMultiple"
                        ) {
                          handleLimitedMultipleSelect(
                            questions[currentStep].id,
                            option.value,
                            (
                              questions[
                                currentStep
                              ] as LimitedMultipleSelectQuestion
                            ).limit
                          );
                        } else {
                          handleMultipleSelect(
                            questions[currentStep].id,
                            option.value
                          );
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 mr-3 flex-shrink-0 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-red-800 bg-red-800"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        {option.icon}
                        <span className="text-gray-700 ml-2">
                          {option.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {questions[currentStep].type === "limitedMultiple" && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected{" "}
                  {
                    (
                      (answers[
                        questions[currentStep].id as keyof AnswersState
                      ] as unknown as any[]) || []
                    ).length
                  }{" "}
                  of{" "}
                  {
                    (questions[currentStep] as LimitedMultipleSelectQuestion)
                      .limit
                  }
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`w-36 flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  currentStep === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border-2 border-red-800 text-red-800 hover:bg-red-50"
                }`}
              >
                <ChevronLeft className="mr-2" size={16} />
                Back
              </button>
              <button
                onClick={nextStep}
                className="w-36 flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 bg-red-800 hover:bg-red-900 text-white"
              >
                {currentStep === questions.length - 1 ? "See Results" : "Next"}
                {currentStep !== questions.length - 1 && (
                  <ChevronRight className="ml-2" size={16} />
                )}
              </button>
            </div>
          </>
        ) : (
          // Results View
          <div>
            <h2 className="text-2xl font-bold text-red-800 mb-6">
              Your Digital Tools Recommendation
            </h2>

            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                You are: The {userPersona}
              </h3>
              <p className="text-gray-700">
                {userPersona === "Navigator" &&
                  "You're new to digital tools and seeking clear guidance and simple solutions."}
                {userPersona === "Career Builder" &&
                  "You're focused on professional advancement and job opportunities."}
                {userPersona === "Content Creator" &&
                  "You regularly produce various types of documents and presentations."}
                {userPersona === "Connector" &&
                  "You're primarily focused on communication and collaboration with others."}
                {userPersona === "Data Manager" &&
                  "You work extensively with information organization and analysis."}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-red-700 mb-3">
                Recommended Tools
              </h3>
              <div className="space-y-3">
                {recommendedTools
                  .filter((tool) => tool.priority === "primary")
                  .map((tool, index) => (
                    <div
                      key={index}
                      className="p-4 border border-red-200 bg-red-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-xl font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-800">
                            {tool.name}
                          </h4>
                          <p className="text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={restartAssessment}
                className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition duration-300"
              >
                Restart Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
