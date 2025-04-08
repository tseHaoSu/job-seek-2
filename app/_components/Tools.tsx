import {
  FileText,
  Mail,
  Database,
  MessageSquare,
  Calendar,
  Video,
} from "lucide-react";
import React from "react";

const Tools = () => {
  const tools = [
    {
      id: "Word",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
    },
    {
      id: "Outlook",
      icon: <Mail className="h-6 w-6 text-blue-700" />,
    },
    {
      id: "Excel",
      icon: <Database className="h-6 w-6 text-green-600" />,
    },
    {
      id: "Teams",
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
    },
    {
      id: "Calendar",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
    },
    {
      id: "OneDrive",
      icon: <Video className="h-6 w-6 text-blue-400" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
          Difficult Deciding?
        </h1>
        <h3 className="text-xl md:text-2xl text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          tempora sapiente fuga, illo vitae hic itaque. Quisquam, iusto? Quasi,
          corrupti!
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 hover:scale-105 hover:bg-gray-50 duration-300 cursor-pointer"
          >
            <div className="mr-4">{tool.icon}</div>
            <h3 className="font-semibold text-lg text-gray-900">{tool.id}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
