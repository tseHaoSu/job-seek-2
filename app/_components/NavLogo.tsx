"use client";

import { useState, useEffect } from "react";

import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

const NavLogo = () => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "ishovering";

  const { rive, RiveComponent } = useRive({
    src: "/logo.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const isHoveringInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );
  
  useEffect(() => {
    if (isHoveringInput) {
      isHoveringInput.value = false;
    }
  }, [isHoveringInput]);
  
  return (
    <div
      className="w-full max-w-[420px] aspect-[600/235] flex items-center justify-center overflow-visible"
      style={{ width: "100%", height: "100%" }}
      onMouseEnter={() => isHoveringInput && (isHoveringInput.value = true)}
      onMouseLeave={() => isHoveringInput && (isHoveringInput.value = false)}>
        <RiveComponent
            style={{
            width: "100%",
            height: "100%",
            display: "block",
            }}
        />
    </div>
  );
};

export default NavLogo;
