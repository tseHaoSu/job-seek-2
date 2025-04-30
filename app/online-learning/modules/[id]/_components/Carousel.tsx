import React, { ReactNode } from "react";
import {
  Carousel as UICarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ReusableCarouselProps = {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
};

const Carousel = ({
  items,
  className = "w-full max-w-4xl mx-auto relative",
  itemClassName = "p-2",
}: ReusableCarouselProps) => {
  return (
    <UICarousel className={className}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
      <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
    </UICarousel>
  );
};

export default Carousel;
