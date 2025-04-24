import React, { useState, useEffect } from "react";

interface ConfettiProps {
  /** Duration in milliseconds for how long the confetti animation should run */
  duration?: number;
  /** Number of confetti particles to display */
  particleCount?: number;
  /** Whether the confetti is currently visible */
  isVisible?: boolean;
  /** Optional callback function when animation completes */
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speedX: number;
  speedY: number;
}

const Confetti: React.FC<ConfettiProps> = ({
  duration = 5000,
  particleCount = 100,
  isVisible = true,
  onComplete,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isVisible) {
      setParticles([]);
      return;
    }

    // Create confetti particles
    const newParticles = [];
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Random x position (0-100%)
        y: -20 - Math.random() * 80, // Start above the viewport
        size: 5 + Math.random() * 10, // Random size
        color: colors[Math.floor(Math.random() * colors.length)], // Random color
        rotation: Math.random() * 360, // Random rotation
        speedX: -2 + Math.random() * 4, // Random horizontal speed
        speedY: 2 + Math.random() * 2, // Random fall speed
      });
    }

    setParticles(newParticles);

    // Animation loop
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed > duration) {
        // Stop after specified duration
        cancelAnimationFrame(animationId);
        if (onComplete) {
          onComplete();
        }
        return;
      }

      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: particle.y + particle.speedY,
          x: particle.x + particle.speedX,
          rotation: particle.rotation + 1,
        }))
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, duration, particleCount, onComplete]);

  if (!isVisible || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
