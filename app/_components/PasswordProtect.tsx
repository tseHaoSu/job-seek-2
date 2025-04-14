"use client";
import { useState, useEffect, ReactNode, FormEvent } from "react";

interface PasswordProtectProps {
  children: ReactNode;
}

const PasswordProtect = ({ children }: PasswordProtectProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = process.env.NEXT_PUBLIC_PASSWORD || "";
  const SESSION_KEY = "password_authenticated";

  useEffect(() => {
    const sessionAuthenticated = sessionStorage.getItem(SESSION_KEY);
    if (sessionAuthenticated === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === correctPassword) {
      // Save authentication status to localStorage
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // Show nothing during initial authentication check
  if (isAuthenticated === null) {
    return null; //spinner
  }

  // Show protected content if authenticated
  if (isAuthenticated === true) {
    return <>{children}</>;
  }

  // Show login form if not authenticated
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-6">Password Protected</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordProtect;
