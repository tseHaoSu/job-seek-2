import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ExternalLink, GripVertical, Pin, PinOff, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CardData } from "./card-data";

interface SortableCardProps {
  card: CardData;
  onRemove: (id: number) => void;
  onTogglePin: (id: number) => void;
}

export const SortableCard: React.FC<SortableCardProps> = ({
  card,
  onRemove,
  onTogglePin,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  // Define pinned card styling with red theme
  const cardClass = card.pinned
    ? "border border-gray-200 bg-white shadow-xl ring-2 ring-red-500"
    : "border border-gray-200 bg-white shadow-md";

  return (
    <div ref={setNodeRef} style={style} className="h-full">
      <div
        className={`${cardClass} p-6 rounded-2xl ${
          isDragging ? "shadow-none opacity-0" : "shadow-md"
        } hover:shadow-lg transition-all duration-300 h-full flex flex-col relative group backdrop-blur-sm`}
        style={{ visibility: isDragging ? "hidden" : "visible" }}
      >
        {/* Action buttons that appear on hover */}
        <div className="absolute top-3 right-3 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          {/* Pin/Unpin button */}
          <button
            onClick={() => onTogglePin(card.id)}
            className="p-1.5 rounded-md hover:bg-red-100 text-red-500"
            title={card.pinned ? "Unpin card" : "Pin card to top"}
          >
            {card.pinned ? (
              <PinOff className="h-4 w-4" />
            ) : (
              <Pin className="h-4 w-4" />
            )}
          </button>

          {/* Remove button */}
          <button
            onClick={() => onRemove(card.id)}
            className="p-1.5 rounded-md hover:bg-red-100 text-red-500"
            title="Remove from dashboard"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="p-1.5 rounded-md cursor-grab hover:bg-red-100"
          >
            <GripVertical className="h-4 w-4 text-red-400" />
          </div>
        </div>

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
