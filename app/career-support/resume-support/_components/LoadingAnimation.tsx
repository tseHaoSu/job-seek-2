"use client";
import { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

const LoadingAnimation = () => {
  const { rive, RiveComponent } = useRive({
    src: "/ai-generating.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (rive) {
      console.log("Rive Loaded", rive);
      const input = rive.stateMachineInputs("State Machine 1").find(i => i.name === "isGenerating");
      input?.fire();
    }
  }, [rive]);

  return (
    <div
      style={{
        position: "relative",
        width: "300px",
        height: "300px",
        margin: "0 auto",
      }}
    >
      <RiveComponent />
    </div>
  );
};

export default LoadingAnimation;