"use client";

import { useState, useCallback, useEffect } from "react";
import type { NotionPost, Profile, Highlight, WidgetSettings } from "@/lib/types";
import { sortPosts } from "@/lib/utils";
import ProfileHeader from "./ProfileHeader";
import Highlights from "./Highlights";
import Toolbar from "./Toolbar";
import InstagramGrid from "./InstagramGrid";
import ContentMap from "./ContentMap";
import ErrorBanner from "./ErrorBanner";
import LoadingSkeleton from "./LoadingSkeleton";

interface InstagramWidgetProps {
  initialPosts: NotionPost[];
  profile: Profile;
  highlights: Highlight[];
  initialError?: string;
}

const DEFAULT_SETTINGS: WidgetSettings = {
  showBio: true,
  showHighlights: true,
  showContentMap: false,
  sortMode: "date",
};

export default function InstagramWidget({
  initialPosts,
  profile,
  highlights,
  initialError,
}: InstagramWidgetProps) {
  const [posts, setPosts] = useState<NotionPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(initialError);
  const [settings, setSettings] = useState<WidgetSettings>(DEFAULT_SETTINGS);

  // Persist settings to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ig-widget-settings");
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ig-widget-settings", JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch("/api/posts", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to fetch posts");
      }
      setPosts(data.posts);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedPosts = sortPosts(posts, settings.sortMode);

  // Tab state (grid / content map) — mirrors Instagram's grid/tagged tabs
  const [activeTab, setActiveTab] = useState<"grid" | "map">("grid");

  return (
    <div className="bg-white min-h-full overflow-auto">
      {/* Instagram username bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#dbdbdb]">
        <span className="text-[14px] font-semibold text-[#262626]">
          @{profile.username}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#262626]"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 12h8M12 8l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Profile header */}
      {settings.showBio && (
        <ProfileHeader profile={profile} postCount={posts.length} />
      )}

      {/* Highlights */}
      {settings.showHighlights && highlights.length > 0 && (
        <div className="py-3 border-b border-[#dbdbdb]">
          <Highlights highlights={highlights} />
        </div>
      )}

      {/* Toolbar */}
      <Toolbar
        settings={settings}
        onSettingsChange={setSettings}
        onRefresh={refresh}
        loading={loading}
      />

      {/* Error banner */}
      {error && <ErrorBanner message={error} />}

      {/* Tabs */}
      <div className="flex border-b border-[#dbdbdb]">
        <button
          onClick={() => setActiveTab("grid")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-semibold transition-colors border-b-2 ${
            activeTab === "grid"
              ? "border-[#262626] text-[#262626]"
              : "border-transparent text-[#8e8e8e] hover:text-[#262626]"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Grid
        </button>
        {settings.showContentMap && (
          <button
            onClick={() => setActiveTab("map")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-semibold transition-colors border-b-2 ${
              activeTab === "map"
                ? "border-[#262626] text-[#262626]"
                : "border-transparent text-[#8e8e8e] hover:text-[#262626]"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
            </svg>
            Content Map
          </button>
        )}
      </div>

      {/* Content */}
      {loading && posts.length === 0 ? (
        <LoadingSkeleton />
      ) : activeTab === "grid" ? (
        <InstagramGrid posts={sortedPosts} />
      ) : (
        <ContentMap posts={sortedPosts} />
      )}

      {/* Notion branding / footer */}
      <div className="px-4 py-3 text-center border-t border-[#dbdbdb] mt-2">
        <p className="text-[10px] text-[#8e8e8e]">
          Powered by Notion API · {posts.length} posts
        </p>
      </div>
    </div>
  );
}
