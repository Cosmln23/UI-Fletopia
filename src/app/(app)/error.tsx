"use client";
import React from 'react';

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex items-center justify-center min-h-[40vh] text-gray-400 gap-4">
      <span>Something went wrong.</span>
      <button className="glass-border px-3 py-1 rounded" onClick={reset}>Try again</button>
    </div>
  );
}


