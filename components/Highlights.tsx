"use client";

import type { Highlight } from "@/lib/types";

interface HighlightsProps {
  highlights: Highlight[];
}

export default function Highlights({ highlights }: HighlightsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide px-4">
      {highlights.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group">
          {/* Circle with gradient border */}
          <div className="relative rounded-full p-[2px] bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600">
            <div className="rounded-full bg-white p-[2px]">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl transition-transform group-hover:scale-95">
                {h.emoji}
              </div>
            </div>
          </div>
          {/* Label */}
          <span className="text-[11px] text-[#262626] leading-tight text-center max-w-[64px] truncate">
            {h.label}
          </span>
        </div>
      ))}
    </div>
  );
}
