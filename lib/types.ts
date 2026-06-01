export interface NotionPost {
  id: string;
  title: string;
  thumbnail: string | null;
  publishDate: string | null;
  status: string | null;
  gridOrder: number | null;
}

export interface Profile {
  username: string;
  displayName: string;
  bio: string;
  website: string;
  avatarUrl: string;
}

export interface Highlight {
  label: string;
  emoji: string;
}

export type SortMode = "date" | "custom";

export interface WidgetSettings {
  showBio: boolean;
  showHighlights: boolean;
  showContentMap: boolean;
  sortMode: SortMode;
}
