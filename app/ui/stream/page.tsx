"use client";

import { useCompletion } from "@ai-sdk/react";

export default function CompletionStreamPage() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setInput,
  } = useCompletion({
    api: "/api/stream",
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {error && (
          <div className="text-red-500 text-sm bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
            {error.message}
          </div>
        )}

        {isLoading && !completion && (
          <div className="text-zinc-500 text-sm animate-pulse">Thinking...</div>
        )}

        {completion && (
          <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-800/40 text-zinc-800 dark:text-zinc-100 shadow-sm whitespace-pre-wrap">
            {completion}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput(""); // clears input
          handleSubmit(e);
        }}
        className="sticky bottom-0 w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-4 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition-colors shadow-md"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
