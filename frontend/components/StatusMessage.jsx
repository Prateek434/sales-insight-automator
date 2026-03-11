"use client";

export default function StatusMessage({ status, message }) {
  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <div className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-slate-800/50 border border-slate-700 p-4">
        <svg
          className="h-5 w-5 animate-spin text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-sm text-slate-300">
          Analyzing your data and generating summary...
        </span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="mt-6 rounded-lg bg-emerald-900/30 border border-emerald-700 p-4">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium text-emerald-300">{message}</span>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-6 rounded-lg bg-red-900/30 border border-red-700 p-4">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span className="text-sm font-medium text-red-300">{message}</span>
        </div>
      </div>
    );
  }

  return null;
}
