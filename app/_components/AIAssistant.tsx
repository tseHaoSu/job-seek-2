"use client";  // Ensure this is a client-side component

import { useState, useEffect } from "react";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);  // Controls the visibility of the chat window
  const [message, setMessage] = useState("");  // Stores the input message

  const STATE_MACHINE = "State Machine 1";  // Rive file's state machine name (Don't change it)
  const { rive, RiveComponent } = useRive({
    src: "/untitled.riv",  // Rive file path
    stateMachines: STATE_MACHINE,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  // Get state machine inputs
  const hoverInput = useStateMachineInput(rive, STATE_MACHINE, "hovered");
  const clickInput = useStateMachineInput(rive, STATE_MACHINE, "isClicked");

  // Trigger hovered animation when mouse enters
  const handleMouseEnter = () => {
    if (hoverInput) hoverInput.value = true;  // Trigger hovered animation on mouse enter
  };

  // Trigger idle animation when mouse leaves
  const handleMouseLeave = () => {
    if (hoverInput) hoverInput.value = false; // Stop hovered animation, revert to idle
  };

  // Trigger clicked animation when clicked
  const handleClick = () => {
    if (clickInput) clickInput.value = true;  // Trigger clicked animation
    setOpen((prev) => !prev);  // Toggle the window visibility
  };

  // Close the chat window and revert to idle animation
  const handleClose = () => {
    setOpen(false);  // Hide the window
    if (clickInput) clickInput.value = false;  // Stop clicked animation
    if (hoverInput) hoverInput.value = false;  // Revert to idle animation
  };

  // Listen for window close and ensure idle animation when closed
  useEffect(() => {
    if (!open) {
      // Ensure idle animation when the window is closed
      if (hoverInput) hoverInput.value = false;
      if (clickInput) clickInput.value = false;  // Stop clicked animation
    }
  }, [open, hoverInput, clickInput]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      console.log("Sending message: ", message); // Simulate message sending
      setMessage("");  // Clear the input field
    }
  };

  return (
    <>
      {/* Icon part */}
      <div
        onMouseEnter={handleMouseEnter}  // Trigger hovered animation on mouse enter
        onMouseLeave={handleMouseLeave}   // Trigger idle animation on mouse leave
        onClick={handleClick}  // Trigger clicked animation on click
        style={{
          position: "fixed",
          bottom: "40px",  // Increased space between icon and the bottom edge
          right: "30px",   // Increased space between icon and the right edge
          width: "14vw",    // Adjusted icon size with viewport width
          height: "14vw",   // Adjusted icon size with viewport width
          maxWidth: "160px", // Set a maximum size for the icon
          maxHeight: "160px", // Set a maximum size for the icon
          cursor: "pointer",
          zIndex: 1000,
          background: "transparent",
        }}
      >
        <RiveComponent />
      </div>

      {/* Chat window part */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "190px",  // Increased space between window and icon (moved up)
            right: "30px",   // Increased space between window and right edge
            width: "30vw",    // Dynamic width based on viewport size
            height: "45vh",   // Dynamic height based on viewport height
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column", // Align the contents vertically
            maxWidth: "400px",  // Max width to prevent overflow
            maxHeight: "500px", // Max height to prevent overflow
          }}
        >
          <div
            style={{
              backgroundColor: "#D35D5D",  // Red color for the top bar
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>Chat with MoVA</div>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <span>×</span>
            </button>
          </div>

          {/* Message display part */}
          <div
            style={{
              flexGrow: 1,  // Let this part take up all available space
              margin: "20px 0",
              fontSize: "14px",
              color: "#666",
              overflowY: "auto",  // Enable scrolling if needed
            }}
          >
            <p>Just logging you in now...</p>
          </div>

          {/* Input box and send button fixed at the bottom */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #ddd", // Divider line
              paddingTop: "10px",
            }}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message ..."
              style={{
                width: "80%",
                height: "40px",
                padding: "8px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                resize: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                width: "20%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#D35D5D",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
