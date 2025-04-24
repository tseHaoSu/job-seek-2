import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id || "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.1)" : undefined,
    transition: "background-color 0.2s, color 0.2s",
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "2px dashed #ccc",
    minHeight: props.minHeight || "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...props.style,
  };

  return (
    <div ref={setNodeRef} style={style} className={props.className}>
      {props.children || "Drop here"}
    </div>
  );
}
