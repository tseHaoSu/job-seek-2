import { ReactNode } from "react";

export type ComfortLevel =
  | "beginner"
  | "developing"
  | "intermediate"
  | "advanced"
  | "power";

export type Activity =
  | "communication"
  | "contentCreation"
  | "dataManagement"
  | "research"
  | "careerDevelopment"
  | "fileManagement";

export type Challenge =
  | "featureOverwhelm"
  | "efficiency"
  | "workflow"
  | "crossDevice"
  | "rightTool"
  | "collaboration"
  | "security";

export type Goal =
  | "productivity"
  | "jobSuccess"
  | "skillDevelopment"
  | "collaboration"
  | "mobility"
  | "organization"
  | "communication";

export type LearningStyle =
  | "stepByStep"
  | "video"
  | "handson"
  | "comprehensive"
  | "social";

export type QuestionOption = {
  value: string;
  label: string;
  icon: ReactNode;
};

export interface BaseQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface SingleSelectQuestion extends BaseQuestion {
  type: "single";
}

export interface MultipleSelectQuestion extends BaseQuestion {
  type: "multiple";
}

export interface LimitedMultipleSelectQuestion extends BaseQuestion {
  type: "limitedMultiple";
  limit: number;
}

export type Question =
  | SingleSelectQuestion
  | MultipleSelectQuestion
  | LimitedMultipleSelectQuestion;

export interface AnswersState {
  comfortLevel: ComfortLevel | "";
  activities: Activity[];
  challenges: Challenge[];
  goals: Goal[];
  learningStyle: LearningStyle | "";
}

export interface Tool {
  name: string;
  description: string;
  priority: "primary" | "secondary";
  id: string;
}

export type PersonaType =
  | "Navigator"
  | "Career Builder"
  | "Content Creator"
  | "Connector"
  | "Data Manager";
