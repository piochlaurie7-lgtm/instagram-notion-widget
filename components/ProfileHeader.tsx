"use client";

import type { Profile } from "@/lib/types";
import Avatar from "./Avatar";

interface ProfileHeaderProps {
  profile: Profile;
  postCount: number;
}

export default function ProfileHeader({ profile, postCount }: ProfileHeaderProps) {
  return (
    <div className="px-4 pt-4 pb-2">
      {/* Top row: avatar + stats */}
      <div className="flex items-center gap-6 mb-4">
        <Avatar src={profile.avatarUrl} alt={profile.displayName} size={77} />

        {/* Stats */}
        <div className="flex gap-6 flex-1">
          <div className="flex flex-col items-center">
            <span className="text-[14px] font-semibold text-[#262626] leading-none">{postCount}</span>
            <span className="text-[14px] text-[#262626] mt-0.5">posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[14px] font-semibold text-[#262626] leading-none">—</span>
            <span className="text-[14px] text-[#262626] mt-0.5">followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[14px] font-semibold text-[#262626] leading-none">—</span>
            <span className="text-[14px] text-[#262626] mt-0.5">following</span>
          </div>
        </div>
      </div>

      {/* Name + bio + website */}
      <div className="space-y-0.5">
        <p className="text-[14px] font-semibold text-[#262626]">{profile.displayName}</p>
        {profile.bio && (
          <p className="text-[14px] text-[#262626] whitespace-pre-wrap leading-[18px]">
            {profile.bio}
          </p>
        )}
        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-semibold text-[#00376b] hover:underline block"
          >
            {profile.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>
    </div>
  );
}
