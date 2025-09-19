"use client";
import React, { useState } from "react";

export default function Complete() {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState(""); // AI response
  const [isLoading, setIsLoading] = useState(false); // loading flag
  const [error, setError] = useState<string | null>(null); // error message

  const complete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json(); // ✅ await

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setCompletion(data.text); // ✅ server returns { text: "...response..." }
      setPrompt("");
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-800">
      <form
        onSubmit={complete} // ✅ hook up submit handler
        className="bg-gray-500 p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type something..."
            className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 "
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 cursor-pointer text-black rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}

        {completion && (
          <div className="mt-4 p-3 bg-gray-100 rounded-xl w-full  text-gray-800">
            <strong>AI Response:</strong> {completion}
          </div>
        )}
      </form>
    </div>
  );
}
