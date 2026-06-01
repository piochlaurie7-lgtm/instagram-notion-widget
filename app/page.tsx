import { fetchPosts } from "@/lib/notion";
import type { Profile, Highlight, NotionPost } from "@/lib/types";
import InstagramWidget from "@/components/InstagramWidget";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getProfile(): Profile {
  return {
    username: process.env.NEXT_PUBLIC_PROFILE_USERNAME ?? "yourusername",
    displayName:
      process.env.NEXT_PUBLIC_PROFILE_DISPLAY_NAME ?? "Your Name",
    bio: process.env.NEXT_PUBLIC_PROFILE_BIO ?? "Your bio ✨",
    website: process.env.NEXT_PUBLIC_PROFILE_WEBSITE ?? "",
    avatarUrl:
      process.env.NEXT_PUBLIC_PROFILE_AVATAR_URL ??
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  };
}

function getHighlights(): Highlight[] {
  try {
    const raw = process.env.NEXT_PUBLIC_HIGHLIGHTS;
    if (!raw) return [];
    return JSON.parse(raw) as Highlight[];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const profile = getProfile();
  const highlights = getHighlights();

  let initialPosts: NotionPost[] = [];
  let initialError: string | undefined;

  try {
    initialPosts = await fetchPosts();
  } catch (e) {
    initialError =
      e instanceof Error
        ? e.message
        : "Could not connect to Notion. Please check your environment variables.";
  }

  return (
    <main className="w-full min-h-screen bg-white">
      <InstagramWidget
        initialPosts={initialPosts}
        profile={profile}
        highlights={highlights}
        initialError={initialError}
      />
    </main>
  );
}
