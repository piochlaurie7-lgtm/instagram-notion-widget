# 📸 Instagram Grid Widget for Notion

Embed an Instagram-style content calendar grid inside any Notion page using `/embed`.

## ✨ Features

- **Instagram-style profile header** — avatar (with gradient ring), display name, bio, website, post/follower/following stats
- **Story highlights** — circular emoji highlights below the bio
- **3-column photo grid** — square images with hover overlay (title, date, order)
- **Toolbar** — Refresh button, Sort menu (Publish Date / Custom Order), Settings dropdown
- **Settings panel** — toggles for Show Bio, Show Highlights, Show Content Map; sort mode radio buttons
- **Content Map tab** — status legend + upcoming posts list
- **Status dots** — color-coded dots (Published, Draft, Scheduled, Idea, Archived) on each grid cell
- **Persists settings** to localStorage across sessions
- **Embeds in Notion** via `/embed` — correct CSP & X-Frame-Options headers

---

## 🗂 Notion Database Setup

Your Notion database must have these properties:

| Property Name  | Type     | Notes                                  |
|----------------|----------|----------------------------------------|
| `Title`        | Title    | Required — auto-detected               |
| `Thumbnail`    | Files    | Upload image or paste external URL     |
| `Publish Date` | Date     | Used for date sorting                  |
| `Status`       | Select   | Published / Draft / Scheduled / Idea / Archived |
| `Grid Order`   | Number   | Used for custom order sorting          |

> Property names are case-sensitive. Alternatives like `publish_date`, `grid_order`, `Date`, or `Order` are also recognized.

---

## 🚀 Setup & Deployment

### 1. Create a Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click **+ New integration**
3. Give it a name (e.g. "Instagram Widget")
4. Copy the **Internal Integration Secret** (starts with `secret_...`)

### 2. Share your database with the integration

1. Open your Notion database
2. Click the **···** menu (top right) → **Add connections**
3. Find and select your integration

### 3. Get your Database ID

From the database URL:
```
https://notion.so/workspace/DATABASE_ID?v=VIEW_ID
```
The `DATABASE_ID` is a 32-character alphanumeric string.

### 4. Clone & configure

```bash
git clone <your-repo>
cd instagram-notion-widget
npm install
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_PROFILE_USERNAME=johndoe
NEXT_PUBLIC_PROFILE_DISPLAY_NAME=John Doe
NEXT_PUBLIC_PROFILE_BIO=Content creator ✨ | Notion enthusiast
NEXT_PUBLIC_PROFILE_WEBSITE=https://johndoe.com
NEXT_PUBLIC_PROFILE_AVATAR_URL=https://...

NEXT_PUBLIC_HIGHLIGHTS=[{"label":"Travel","emoji":"✈️"},{"label":"Food","emoji":"🍜"}]
```

### 5. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 6. Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo in the Vercel dashboard and add the env vars under **Settings → Environment Variables**.

### 7. Embed in Notion

1. In any Notion page, type `/embed`
2. Paste your Vercel URL (e.g. `https://your-widget.vercel.app`)
3. Resize the embed block to your liking (recommended: ~600px wide)

---

## 📁 Project Structure

```
instagram-notion-widget/
├── app/
│   ├── globals.css          # Tailwind + base styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Server component — fetches posts from Notion
│   └── api/
│       └── posts/
│           └── route.ts     # API route for client-side refresh
├── components/
│   ├── InstagramWidget.tsx  # Main client widget (state, settings)
│   ├── ProfileHeader.tsx    # Avatar, stats, name, bio
│   ├── Avatar.tsx           # Circular avatar with gradient ring
│   ├── Highlights.tsx       # Story-style highlights row
│   ├── Toolbar.tsx          # Refresh, Sort, Settings controls
│   ├── InstagramGrid.tsx    # 3-column grid wrapper
│   ├── GridCell.tsx         # Individual grid cell with hover overlay
│   ├── ContentMap.tsx       # Status legend + upcoming posts
│   ├── ErrorBanner.tsx      # Dismissible error message
│   └── LoadingSkeleton.tsx  # Animated loading placeholder
├── lib/
│   ├── notion.ts            # Notion API client + data fetcher
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Sort, format, cn helpers
├── .env.local.example       # Environment variables template
├── next.config.ts           # Image domains + iframe headers
├── tailwind.config.ts
├── vercel.json              # X-Frame-Options + CSP for Notion embed
└── package.json
```

---

## 🎨 Customization

### Status colors
Edit `STATUS_COLORS` in `components/GridCell.tsx` and `components/ContentMap.tsx`.

### Highlight sizes
Edit the circle size in `components/Highlights.tsx` (`w-14 h-14`).

### Grid gap
Edit `gap-[2px]` in `components/InstagramGrid.tsx`.

### Add more sort modes
Extend `SortMode` in `lib/types.ts` and add cases to `sortPosts()` in `lib/utils.ts`.

---

## 🔧 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NOTION_TOKEN` | ✅ | Notion integration secret |
| `NOTION_DATABASE_ID` | ✅ | Your database ID |
| `NEXT_PUBLIC_PROFILE_USERNAME` | optional | @username shown in header |
| `NEXT_PUBLIC_PROFILE_DISPLAY_NAME` | optional | Full display name |
| `NEXT_PUBLIC_PROFILE_BIO` | optional | Bio text (multi-line supported) |
| `NEXT_PUBLIC_PROFILE_WEBSITE` | optional | Website URL |
| `NEXT_PUBLIC_PROFILE_AVATAR_URL` | optional | Avatar image URL |
| `NEXT_PUBLIC_HIGHLIGHTS` | optional | JSON array of `{label, emoji}` |
