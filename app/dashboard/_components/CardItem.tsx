import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pin } from "lucide-react";
import Link from "next/link";
import { CardData } from "./card-data";

interface CardItemProps {
  card: CardData;
}

export const CardItem: React.FC<CardItemProps> = ({ card }) => {
  // Define card class based on pinned status with red theme
  const cardClass = card.pinned
    ? "border border-gray-200 bg-white shadow-xl ring-2 ring-red-500"
    : "border border-gray-200 bg-white shadow-md";

  return (
    <div className="h-full">
      <div
        className={`${cardClass} p-6 rounded-2xl hover:shadow-lg transition-all duration-300 h-full flex flex-col relative group backdrop-blur-sm`}
      >
        {/* Card indicators (pinned) */}
        {card.pinned && (
          <div className="absolute top-4 right-4 flex z-10">
            <div className="bg-red-500 text-white p-1.5 rounded-full shadow-lg">
              <Pin className="h-4 w-4" fill="white" />
            </div>
          </div>
        )}

        <div className="mb-6 relative z-10">
          <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl inline-flex items-center justify-center">
            <card.icon className="h-6 w-6 text-red-600" />
          </div>
        </div>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 mb-3 relative z-10">
          {card.title}
        </h3>

        <p className="leading-7 text-gray-600 mb-6 flex-grow relative z-10">
          {card.description}
        </p>

        <Link href={card.url} className="block mt-auto">
          <Button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl py-2.5 relative z-10 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center font-medium">
            Access Tool
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
