import React from "react";
import { PersonaType, Tool } from "./types";
import { useRouter } from "next/navigation";

interface ResultsProps {
  userPersona: PersonaType;
  recommendedTools: Tool[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({
  userPersona,
  recommendedTools,
  onRestart,
}) => {
  const router = useRouter();

  const navigateTool = (toolId: string) => {
    if (toolId) {
      router.push(`/online-learning/modules/${toolId}`);
    }
  };

  return (
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
                onClick={() => navigateTool(tool.id)}
                className="p-4 border border-red-200 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
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
          onClick={onRestart}
          className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition duration-300"
        >
          Restart Assessment
        </button>
      </div>
    </div>
  );
};

export default Results;
