"use client";
// File: app/components/dashboard/Dashboard.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

// Import custom components

import { SaveSuccessMessage } from "./SaveSuccessMessage";
import { AddCardDropdown } from "./AddCardDropdown";
import { initialCards, additionalCardTemplates } from "./card-data";
import { CardItem } from "./CardItem";
import { DashboardHeader } from "./DashboardHeader";
import { SortableCard } from "./SortableCard";
import { CardData } from "./card-data";

// Import data and types

const Dashboard = () => {
  // Combine initial cards with additional card templates
  const [allCards, setAllCards] = useState<CardData[]>([
    ...initialCards,
    ...additionalCardTemplates,
  ]);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter cards for display (not hidden)
  const visibleCards = allCards.filter((card) => !card.hidden);

  // Filter cards that are hidden (can be added via dropdown)
  const hiddenCards = allCards.filter((card) => card.hidden);

  // Sort cards: pinned cards first, then the rest in their current order
  const sortedCards = [...visibleCards].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  // Find the active card
  const activeCard = allCards.find((card) => card.id === activeId);

  // Set up sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Custom modifier for completely removing placeholders
  const removePlaceholderStyles = () => {
    // Hide any placeholder elements
    const placeholders = document.querySelectorAll("[data-dnd-placeholder]");
    placeholders.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = "none";
        el.style.opacity = "0";
        el.style.visibility = "hidden";
      }
    });

    // Also hide any sortable placeholder elements
    const sortablePlaceholders = document.querySelectorAll(
      ".sortable-placeholder"
    );
    sortablePlaceholders.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = "none";
        el.style.opacity = "0";
        el.style.visibility = "hidden";
      }
    });
  };

  // Handle the end of a drag event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAllCards((cards) => {
        // Create a new array of all cards
        const newCards = [...cards];

        // Find the moved card
        const activeCard = newCards.find((card) => card.id === active.id);
        const overCard = newCards.find((card) => card.id === over.id);

        // Only allow reordering within the same section (pinned or unpinned)
        if (activeCard && overCard && activeCard.pinned === overCard.pinned) {
          const oldIndex = newCards.findIndex((card) => card.id === active.id);
          const newIndex = newCards.findIndex((card) => card.id === over.id);
          return arrayMove(newCards, oldIndex, newIndex);
        }

        return cards;
      });
    }

    setActiveId(null);
  };

  // Handle the start of a drag event
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);

    // Immediately remove any placeholders
    setTimeout(removePlaceholderStyles, 0);
  };

  // Toggle card pin status
  const handleTogglePin = (cardId: number) => {
    setAllCards((cards) =>
      cards.map((card) =>
        card.id === cardId ? { ...card, pinned: !card.pinned } : card
      )
    );
  };

  // Remove card from dashboard
  const handleRemoveCard = (cardId: number) => {
    setAllCards((cards) =>
      cards.map((card) =>
        card.id === cardId ? { ...card, hidden: true } : card
      )
    );
  };

  // Add card to dashboard
  const handleAddCard = (cardId: number) => {
    setAllCards((cards) =>
      cards.map((card) =>
        card.id === cardId ? { ...card, hidden: false } : card
      )
    );
    setIsDropdownOpen(false);
  };

  // Save layout configuration
  const handleSaveLayout = () => {
    // In a real app, this would save to backend/localStorage
    // For demo purposes, just show success message
    setSaveSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Dashboard Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>{saveSuccess && <SaveSuccessMessage />}</div>
        <div className="flex items-center space-x-3 relative">
          <Button
            onClick={handleSaveLayout}
            className="bg-red-700 hover:bg-red-800 text-white rounded-xl px-4"
          >
            Save Layout
          </Button>
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-red-700 hover:bg-red-800 text-white rounded-xl"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Card
          </Button>
          <AddCardDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            hiddenCards={hiddenCards}
            onAddCard={handleAddCard}
          />
        </div>
      </div>

      {/* Application Cards Grid with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={removePlaceholderStyles}
      >
        <SortableContext
          items={sortedCards.map((card) => card.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                onRemove={handleRemoveCard}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: "0.5",
                },
              },
            }),
          }}
        >
          {activeId && activeCard ? <CardItem card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;
