"use client";

import { RefreshCw, ChevronDown, Settings2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { SortMode, WidgetSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  settings: WidgetSettings;
  onSettingsChange: (settings: WidgetSettings) => void;
  onRefresh: () => void;
  loading: boolean;
}

type SortOption = { label: string; value: SortMode };

const SORT_OPTIONS: SortOption[] = [
  { label: "Publish Date", value: "date" },
  { label: "Custom Order", value: "custom" },
];

export default function Toolbar({
  settings,
  onSettingsChange,
  onRefresh,
  loading,
}: ToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentSort = SORT_OPTIONS.find((o) => o.value === settings.sortMode);

  function toggle(key: keyof WidgetSettings) {
    if (key === "sortMode") return;
    onSettingsChange({ ...settings, [key]: !settings[key] });
  }

  return (
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#dbdbdb] bg-white">
      {/* Refresh */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium",
          "bg-[#efefef] hover:bg-[#dbdbdb] text-[#262626] transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        title="Refresh data from Notion"
      >
        <RefreshCw size={13} className={cn("transition-transform", loading && "animate-spin")} />
        <span>Refresh</span>
      </button>

      <div className="flex-1" />

      {/* Sort dropdown */}
      <div className="relative" ref={sortRef}>
        <button
          onClick={() => { setSortOpen(!sortOpen); setSettingsOpen(false); }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium",
            "bg-[#efefef] hover:bg-[#dbdbdb] text-[#262626] transition-colors"
          )}
        >
          <span>Sort: {currentSort?.label}</span>
          <ChevronDown size={12} className={cn("transition-transform", sortOpen && "rotate-180")} />
        </button>

        {sortOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-[#dbdbdb] rounded-xl shadow-lg z-50 min-w-[160px] overflow-hidden py-1">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onSettingsChange({ ...settings, sortMode: opt.value });
                  setSortOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#fafafa] transition-colors",
                  settings.sortMode === opt.value
                    ? "text-[#0095f6] font-semibold"
                    : "text-[#262626]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Settings dropdown */}
      <div className="relative" ref={settingsRef}>
        <button
          onClick={() => { setSettingsOpen(!settingsOpen); setSortOpen(false); }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium",
            "bg-[#efefef] hover:bg-[#dbdbdb] text-[#262626] transition-colors"
          )}
        >
          <Settings2 size={13} />
          <span>Settings</span>
        </button>

        {settingsOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-[#dbdbdb] rounded-xl shadow-lg z-50 min-w-[200px] overflow-hidden py-2">
            <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8e8e8e]">
              Display
            </p>
            {[
              { key: "showBio" as const, label: "Show Bio" },
              { key: "showHighlights" as const, label: "Show Highlights" },
              { key: "showContentMap" as const, label: "Show Content Map" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center justify-between px-4 py-2 hover:bg-[#fafafa] cursor-pointer"
              >
                <span className="text-[13px] text-[#262626]">{label}</span>
                <Toggle
                  checked={settings[key] as boolean}
                  onChange={() => toggle(key)}
                />
              </label>
            ))}

            <div className="border-t border-[#dbdbdb] my-1" />
            <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8e8e8e]">
              Sort
            </p>
            {SORT_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center justify-between px-4 py-2 hover:bg-[#fafafa] cursor-pointer"
              >
                <span className="text-[13px] text-[#262626]">{opt.label}</span>
                <Toggle
                  checked={settings.sortMode === opt.value}
                  onChange={() => onSettingsChange({ ...settings, sortMode: opt.value })}
                  type="radio"
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Mini toggle component
function Toggle({
  checked,
  onChange,
  type = "checkbox",
}: {
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
}) {
  if (type === "radio") {
    return (
      <div
        onClick={onChange}
        className={cn(
          "w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer",
          checked ? "border-[#0095f6]" : "border-[#8e8e8e]"
        )}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-[#0095f6]" />}
      </div>
    );
  }

  return (
    <div
      onClick={onChange}
      className={cn(
        "relative w-9 h-5 rounded-full transition-colors cursor-pointer",
        checked ? "bg-[#0095f6]" : "bg-[#dbdbdb]"
      )}
    >
      <div
        className={cn(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </div>
  );
}
