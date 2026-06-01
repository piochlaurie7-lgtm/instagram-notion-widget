"use client";

import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-start gap-2 mx-3 my-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-[12px] text-red-700">
      <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
      <span className="flex-1 leading-snug">{message}</span>
      <button
        onClick={() => setDismissed(true)}
        className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
