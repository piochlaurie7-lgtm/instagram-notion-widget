import { NextResponse } from "next/server";
import { fetchPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const posts = await fetchPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
