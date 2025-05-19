import { Activity, AnswersState, Goal, PersonaType, Tool } from "./types";

export const determinePersona = (answers: AnswersState): PersonaType => {
  const { comfortLevel, activities, goals, learningStyle } = answers;

  if (
    ["beginner", "developing"].includes(comfortLevel as string) &&
    ["stepByStep", "video"].includes(learningStyle as string)
  ) {
    return "Navigator";
  }

  if (
    activities.includes("careerDevelopment" as Activity) &&
    goals.includes("jobSuccess" as Goal)
  ) {
    return "Career Builder";
  }

  if (
    activities.includes("contentCreation" as Activity) &&
    (goals.includes("productivity" as Goal) ||
      goals.includes("organization" as Goal))
  ) {
    return "Content Creator";
  }

  if (
    activities.includes("communication" as Activity) &&
    (goals.includes("communication" as Goal) ||
      goals.includes("collaboration" as Goal))
  ) {
    return "Connector";
  }

  if (
    activities.includes("dataManagement" as Activity) &&
    (goals.includes("organization" as Goal) ||
      goals.includes("productivity" as Goal))
  ) {
    return "Data Manager";
  }

  return "Navigator";
};

export const determineTools = (persona: PersonaType): Tool[] => {
  const toolSets: Record<PersonaType, Tool[]> = {
    Navigator: [
      {
        name: "Gmail",
        description: "Easy-to-use email platform for beginners",
        priority: "primary",
        id: "1",
      },
      {
        name: "Word",
        description: "Create simple documents with intuitive interface",
        priority: "primary",
        id: "7",
      },
      {
        name: "Acrobat Reader",
        description: "View PDF files without complexity",
        priority: "primary",
        id: "10",
      },
      {
        name: "Teams",
        description: "Join meetings with minimal setup",
        priority: "secondary",
        id: "6",
      },
    ],
    "Career Builder": [
      {
        name: "LinkedIn",
        description: "Network and discover job opportunities",
        priority: "primary",
        id: "9",
      },
      {
        name: "SEEK",
        description: "Search and apply for jobs efficiently",
        priority: "primary",
        id: "12",
      },
      {
        name: "Gmail",
        description: "Maintain professional communications",
        priority: "primary",
        id: "1",
      },
      {
        name: "Word",
        description: "Create standout resumes and cover letters",
        priority: "secondary",
        id: "7",
      },
      {
        name: "PowerPoint",
        description: "Build impressive portfolios and presentations",
        priority: "secondary",
        id: "8",
      },
    ],
    "Content Creator": [
      {
        name: "Word",
        description: "Create professional documents with advanced formatting",
        priority: "primary",
        id: "7",
      },
      {
        name: "PowerPoint",
        description: "Design impactful presentations",
        priority: "primary",
        id: "8",
      },
      {
        name: "Excel",
        description: "Organize data and create visualizations",
        priority: "primary",
        id: "4",
      },
      {
        name: "Acrobat Pro",
        description: "Create and edit professional PDF documents",
        priority: "secondary",
        id: "10",
      },
    ],
    Connector: [
      {
        name: "Gmail",
        description: "Manage communications efficiently",
        priority: "primary",
        id: "1",
      },
      {
        name: "Teams",
        description: "Collaborate with teammates in real-time",
        priority: "primary",
        id: "6",
      },
      {
        name: "Zoom",
        description: "Host and join professional video meetings",
        priority: "primary",
        id: "3",
      },
      {
        name: "Word",
        description: "Collaborate on shared documents",
        priority: "secondary",
        id: "7",
      },
    ],
    "Data Manager": [
      {
        name: "Excel",
        description: "Analyze and visualize data effectively",
        priority: "primary",
        id: "4",
      },
      {
        name: "Acrobat Pro",
        description: "Manage and secure important documents",
        priority: "primary",
        id: "10",
      },
      {
        name: "Word",
        description: "Create reports from your data analysis",
        priority: "secondary",
        id: "7",
      },
    ],
  };

  return toolSets[persona] || toolSets["Navigator"];
};
