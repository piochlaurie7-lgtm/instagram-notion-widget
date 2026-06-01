import { Client } from "@notionhq/client";
import type { NotionPost } from "./types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

let notion: Client | null = null;

function getClient(): Client {
  if (!notion) {
    notion = new Client({ auth: process.env.NOTION_TOKEN });
  }
  return notion;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTitle(prop: any): string {
  if (!prop || prop.type !== "title") return "Untitled";
  return (prop.title as Array<{ plain_text: string }>)
    .map((t) => t.plain_text)
    .join("") || "Untitled";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractFileUrl(prop: any): string | null {
  if (!prop || prop.type !== "files") return null;
  const file = prop.files[0];
  if (!file) return null;
  if (file.type === "file") return file.file.url;
  if (file.type === "external") return file.external.url;
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractDate(prop: any): string | null {
  if (!prop || prop.type !== "date") return null;
  return prop.date?.start ?? null;
}

// Handles both "select" and "status" property types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractStatus(prop: any): string | null {
  if (!prop) return null;
  if (prop.type === "select") return prop.select?.name ?? null;
  if (prop.type === "status") return prop.status?.name ?? null;
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractNumber(prop: any): number | null {
  if (!prop || prop.type !== "number") return null;
  return prop.number ?? null;
}

export async function fetchPosts(): Promise<NotionPost[]> {
  const client = getClient();
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not set");
  }

  const response = await client.databases.query({
    database_id: databaseId,
    page_size: 100,
  });

  const posts: NotionPost[] = [];

  for (const page of response.results) {
    if (page.object !== "page") continue;
    const p = page as PageObjectResponse;
    const props = p.properties;

    // Title — always auto-detected by type
    const titleProp = Object.values(props).find((v) => v.type === "title");

    // Thumbnail — supports: Images, Thumbnail, thumbnail, Cover
    const thumbnailProp =
      props["Images"] ??
      props["Thumbnail"] ??
      props["thumbnail"] ??
      props["Cover"] ??
      props["cover"];

    // Date — supports: Data publicação, Publish Date, publish_date, Date
    const dateProp =
      props["Data publicação"] ??
      props["Publish Date"] ??
      props["publish_date"] ??
      props["Date"];

    // Status — supports select and status types
    const statusProp = props["Status"] ?? props["status"];

    // Grid Order — supports: Grid Order, grid_order, Order
    const orderProp =
      props["Grid Order"] ??
      props["grid_order"] ??
      props["Order"];

    posts.push({
      id: p.id,
      title: extractTitle(titleProp),
      thumbnail: extractFileUrl(thumbnailProp),
      publishDate: extractDate(dateProp),
      status: extractStatus(statusProp),
      gridOrder: extractNumber(orderProp),
    });
  }

  return posts;
}
