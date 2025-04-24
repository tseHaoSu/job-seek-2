import React from "react";
import { X, Plus } from "lucide-react";
import { CardData } from "./card-data";

interface AddCardDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  hiddenCards: CardData[];
  onAddCard: (cardId: number) => void;
}

export const AddCardDropdown: React.FC<AddCardDropdownProps> = ({
  isOpen,
  onClose,
  hiddenCards,
  onAddCard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-red-200 p-4 z-50 w-72">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-red-900">Add Cards</h3>
        <button onClick={onClose} className="text-red-500 hover:text-red-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      {hiddenCards.length === 0 ? (
        <p className="text-gray-500 text-sm py-2">
          All cards are already displayed on your dashboard.
        </p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {hiddenCards.map((card) => (
            <li
              key={card.id}
              className="flex items-center justify-between p-2 hover:bg-red-50 rounded-lg cursor-pointer"
              onClick={() => onAddCard(card.id)}
            >
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg mr-3">
                  <card.icon className="h-4 w-4 text-red-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {card.title}
                </span>
              </div>
              <Plus className="h-4 w-4 text-red-600" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
