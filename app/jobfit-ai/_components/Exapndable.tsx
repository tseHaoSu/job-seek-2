import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  children: string;
}

const Expandable = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;

  if (children.length <= limit) {
    return <p className="text-sm">{children}</p>;
  }

  const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <div className="text-sm space-y-2">
      <p>{summary}</p>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-700  hover:bg-red-50 hover:text-red-900"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Less" : "More"}
      </Button>
    </div>
  );
};

export default Expandable;
