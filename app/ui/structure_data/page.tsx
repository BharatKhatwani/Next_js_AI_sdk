"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structure/schema";

export default function StructuredDataPage() {
  const [dishName, setDishName] = useState("");
  const [messages, setMessages] = useState<string[]>([]); // <-- store submitted inputs

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structure",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dishName.trim()) return;

    // store message before clearing
    setMessages((prev) => [...prev, dishName]);

    submit({ dish: dishName });
    setDishName("");
  };

  return (
    <div className="flex flex-col w-full max-w-2xl pt-12 pb-24 mx-auto">
      {/* Show error */}
      {error && <div className="text-red-500 mb-4 px-4">{error.message}</div>}

      {/* Show stored messages */}
      {messages.length > 0 && (
        <div className="mb-6 px-4">
          <h3 className="text-lg font-semibold mb-2">Your requests</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
            {messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Show generated recipe */}
      {object?.recipe && (
        <div className="space-y-6 px-4">
          <h2 className="text-2xl font-bold">{object.recipe.name}</h2>

          {object?.recipe?.ingradient && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <div className="grid grid-cols-2 gap-4">
                {object.recipe.ingradient.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg"
                  >
                    <p className="font-medium">{ingredient?.name}</p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {ingredient?.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {object?.recipe?.steps && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Steps</h3>
              <ol className="space-y-4">
                {object.recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg"
                  >
                    <span className="font-medium mr-2">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-2xl mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Enter a dish name..."
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !dishName}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
