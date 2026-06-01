"use client";

import type { NotionPost } from "@/lib/types";
import GridCell from "./GridCell";

interface InstagramGridProps {
  posts: NotionPost[];
}

export default function InstagramGrid({ posts }: InstagramGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#dbdbdb] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e8e8e" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <p className="text-[14px] font-semibold text-[#262626]">No posts yet</p>
        <p className="text-[12px] text-[#8e8e8e] mt-1">
          Add entries to your Notion database to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[2px] bg-[#dbdbdb]">
      {posts.map((post, index) => (
        <GridCell key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
