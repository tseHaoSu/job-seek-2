"use client";

import { useState, useEffect, useRef } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import Hint from "./Hint";
import { z } from "zod";

const messageSchema = z
  .string()
  .min(2, {
    message: "Message must be at least 2 characters.",
  })
  .max(500, {
    message: "Message cannot exceed 500 characters.",
  });

//TODO : split file
const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "system", text: "How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Light pink theme color
  const themeColor = "#F08080"; 

  const STATE_MACHINE = "State Machine 1";

  const { rive, RiveComponent } = useRive({
    src: "/untitled.riv",
    stateMachines: STATE_MACHINE,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    setSessionId(
      `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    );
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) {
      hoverInput && (hoverInput.value = false);
      clickInput && (clickInput.value = false);
    }
  }, [open]);

  const hoverInput = useStateMachineInput(rive, STATE_MACHINE, "hovered");
  const clickInput = useStateMachineInput(rive, STATE_MACHINE, "isClicked");

  const handleMouseEnter = () => hoverInput && (hoverInput.value = true);
  const handleMouseLeave = () => hoverInput && (hoverInput.value = false);

  const handleClick = () => {
    clickInput && (clickInput.value = true);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
    clickInput && (clickInput.value = false);
    hoverInput && (hoverInput.value = false);
  };

  const validateMessage = (text: string) => {
    try {
      messageSchema.parse(text.trim());
      return { valid: true, error: "" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { valid: false, error: error.errors[0].message };
      }
      return { valid: false, error: "Invalid message" };
    }
  };

  const parseSSEResponse = (text: String) => {
    return text
      .split("data:")
      .filter((token) => token.trim() !== "")
      .map((token) => token.trim())
      .join(" ");
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    const validation = validateMessage(message);
    if (!validation.valid) {
      setValidationError(validation.error);
      return;
    }

    setValidationError("");
    if (!sessionId) {
      setSessionId(
        `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
      );
    }

    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setIsLoading(true);
    setIsTyping(true);

    const trimmedMessage = message.trim();
    setMessage("");

    try {
      setMessages((prev) => [...prev, { sender: "assistant", text: "" }]);

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          prompt: trimmedMessage,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get reader from response");
      }

      const decoder = new TextDecoder();
      let accumulatedSSE = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          const finalMessage = parseSSEResponse(accumulatedSSE);
          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages.length > 0) {
              newMessages[newMessages.length - 1] = {
                ...newMessages[newMessages.length - 1],
                text: finalMessage,
              };
            }
            return newMessages;
          });
          break;
        }

        accumulatedSSE += decoder.decode(value, { stream: true });
        const currentMessage = parseSSEResponse(accumulatedSSE);

        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = {
              ...newMessages[newMessages.length - 1],
              text: currentMessage,
            };
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      let errorMessage = "Sorry, there was an error connecting to the server.";
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <>
      <Hint label="Chat with me!" side="top" sideOffset={80}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            width: "14vw",
            height: "14vw",
            maxWidth: "120px",
            maxHeight: "120px",
            cursor: "pointer",
            zIndex: 1000,
            background: "transparent",
          }}
        >
          <RiveComponent />
        </div>
      </Hint>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "190px",
            right: "30px",
            width: "30vw",
            height: "45vh",
            backgroundColor: "#fff",
            border: `1px solid ${themeColor}`,
            borderRadius: "20px", // More rounded corners
            padding: "15px",
            boxShadow: `0 4px 20px rgba(255,182,193,0.30)`, // Shadow with theme color
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            maxHeight: "500px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: themeColor,
              color: "white",
              padding: "12px 15px",
              borderRadius: "15px", // More rounded corners
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              SkillBot
            </div>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
                cursor: "pointer",
                width: "24px",
                height: "24px",
                borderRadius: "12px", // Circular button
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                padding: 0,
              }}
            >
              <span>×</span>
            </button>
          </div>

          <div
            style={{
              flexGrow: 1,
              margin: "15px 0",
              fontSize: "14px",
              color: "#666",
              overflowY: "auto",
              padding: "0 5px",
              scrollbarWidth: "thin",
              scrollbarColor: `${themeColor} #f0f0f0`,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "12px",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor:
                      msg.sender === "user"
                        ? `rgba(139,0,0,0.1)` // Light theme color background for user
                        : "#f0f0f0",
                    padding: "10px 14px",
                    borderRadius: "18px", // More rounded message bubbles
                    maxWidth: "80%",
                    wordWrap: "break-word",
                    color: msg.sender === "user" ? "#333" : "#333", // Darker text for better contrast on light pink
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {msg.text}
                  {msg.sender === "assistant" &&
                    index === messages.length - 1 &&
                    isTyping &&
                    msg.text.length > 0 && (
                      <span className="typing-cursor">|</span>
                    )}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1]?.text === "" && (
              <div style={{ textAlign: "left", marginBottom: "12px" }}>
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f0f0f0",
                    padding: "10px 14px",
                    borderRadius: "18px", // More rounded
                  }}
                >
                  <span className="typing-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: `1px solid rgba(139,0,0,0.2)`,
              paddingTop: "12px",
            }}
          >
            {validationError && (
              <div
                style={{
                  color: themeColor,
                  fontSize: "12px",
                  marginBottom: "5px",
                  textAlign: "left",
                }}
              >
                {validationError}
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (validationError) {
                    const validation = validateMessage(e.target.value);
                    if (validation.valid) {
                      setValidationError("");
                    }
                  }
                }}
                placeholder="Chat with me..."
                style={{
                  width: "80%",
                  height: "40px",
                  padding: "10px 12px",
                  borderRadius: "15px", // More rounded
                  border: validationError
                    ? `1px solid ${themeColor}`
                    : `1px solid rgba(139,0,0,0.3)`,
                  resize: "none",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border 0.2s ease",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.target.style.border = `1px solid ${themeColor}`;
                }}
                onBlur={(e) => {
                  if (!validationError) {
                    e.target.style.border = `1px solid rgba(139,0,0,0.3)`;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                style={{
                  width: "20%",
                  padding: "10px",
                  borderRadius: "15px", // More rounded
                  border: "none",
                  backgroundColor: themeColor,
                  color: "white",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  opacity: isLoading ? 0.7 : 1,
                  fontWeight: "bold",
                  transition: "background-color 0.2s ease",
                  boxShadow: "0 2px 4px rgba(139,0,0,0.2)",
                }}
                disabled={isLoading}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = "#F08080"; // Slightly darker on hover
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = themeColor;
                }}
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#888",
                textAlign: "right",
                marginTop: "4px",
              }}
            >
              {message.length}/500
            </div>
          </form>

          <style jsx>{`
            .typing-indicator {
              display: inline-flex;
              align-items: center;
            }

            .dot {
              display: inline-block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: ${themeColor};
              margin: 0 2px;
              animation: bounce 1.4s infinite ease-in-out;
              opacity: 0.8;
            }

            .dot:nth-child(1) {
              animation-delay: 0s;
            }

            .dot:nth-child(2) {
              animation-delay: 0.2s;
            }

            .dot:nth-child(3) {
              animation-delay: 0.4s;
            }

            .typing-cursor {
              display: inline-block;
              width: 2px;
              height: 14px;
              background-color: ${themeColor};
              margin-left: 4px;
              animation: blink 1s infinite;
            }

            @keyframes bounce {
              0%,
              80%,
              100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-4px);
              }
            }

            @keyframes blink {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
