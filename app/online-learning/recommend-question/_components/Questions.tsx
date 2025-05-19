"use client";

import React, { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { questions } from "./questionsData";
import { AnswersState, Question, PersonaType, Tool } from "./types";
import Results from "./Results";
import { determinePersona, determineTools } from "./utils";

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

  const handleSingleSelect = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value as any,
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
      [questionId]: newSelections as any,
    });
  };

  const handleLimitedMultipleSelect = (
    questionId: string,
    value: string,
    limit: number
  ) => {
    const currentSelections =
      (answers[questionId as keyof AnswersState] as string[]) || [];

    if (currentSelections.includes(value)) {
      setAnswers({
        ...answers,
        [questionId]: currentSelections.filter((item) => item !== value) as any,
      });
      return;
    }

    if (currentSelections.length < limit) {
      setAnswers({
        ...answers,
        [questionId]: [...currentSelections, value] as any,
      });
    }
  };

  const nextStep = () => {
    const currentQuestion = questions[currentStep];

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
      const persona = determinePersona(answers);
      setUserPersona(persona);
      const tools = determineTools(persona);
      setRecommendedTools(tools);
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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

  if (showResults) {
    return (
      <Results
        userPersona={userPersona as PersonaType}
        recommendedTools={recommendedTools}
        onRestart={restartAssessment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="p-8">
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
                        (questions[currentStep] as any).limit
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
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    {option.icon}
                    <span className="text-gray-700 ml-2">{option.label}</span>
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
              of {(questions[currentStep] as any).limit}
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
      </div>
    </div>
  );
};

export default Questions;
