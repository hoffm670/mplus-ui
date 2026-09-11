---
name: archon-dungeon-icons
description: Fetches Archon Mythic+ dungeon icon images and wires them into the DungeonIcon helper. Use when updating dungeon icons for a new WoW Midnight Mythic+ season or when the user asks to refresh dungeon imagery from Archon.
---

# Archon Dungeon Icons

## When to use this skill

Use this skill whenever you need to:

- Update or add Mythic+ **dungeon icon images** for a new Midnight season.
- Sync dungeon icons with **Archon’s Midnight Mythic+ tier list** at `https://www.archon.gg/wow/tier-list/dps-rankings/mythic-plus/10/all-dungeons/this-week`.
- Wire those icons into the `DungeonIcon` system in this repo (`components/DungeonIcon`).

## Files involved

- `components/DungeonIcon/helper.ts` – source of truth mapping from short dungeon codes to `{ url, alt }`.
- `public/` – stores the `.jpg` dungeon icons used by `next/image`.

## Workflow

Follow these steps in order:

### 1. Fetch Archon data

1. Use a web fetch or `curl` to load the Archon Midnight Mythic+ tier list page:

   - URL: `https://www.archon.gg/wow/tier-list/dps-rankings/mythic-plus/10/all-dungeons/this-week`

2. In the HTML, locate the embedded `__NEXT_DATA__` JSON block.

3. From that JSON, identify the **current dungeon pool** and their icon URLs:

   - Use `page.props.page.encounterTierListSection` and/or
   - `page.props.page.encounterRankingsSection`

4. For each dungeon entry, capture:

   - `name` – human-readable dungeon name (for `alt`)
   - `icon` – full URL to the dungeon icon image (ends with something like `.../bosses/<id>-icon.jpg?v=3`)

### 2. Download icon images into `public/`

1. For each dungeon, pick a clear, kebab-case filename based on the dungeon name, e.g.:

   - `Algeth'ar Academy` → `algethar-academy.jpg`
   - `Magisters' Terrace` → `magisters-terrace.jpg`
   - `Maisara Caverns` → `maisara-caverns.jpg`
   - `Nexus-Point Xenas` → `nexus-point-xenas.jpg`
   - `Pit of Saron` → `pit-of-saron.jpg`
   - `Seat of the Triumvirate` → `seat-of-the-triumvirate.jpg`
   - `Skyreach` → `skyreach.jpg`
   - `Windrunner Spire` → `windrunner-spire.jpg`

2. Download each icon to `public/<filename>.jpg` using `curl` or an equivalent HTTP client, preserving the `.jpg` extension and ignoring any query string (e.g. `?v=3`).

3. Verify the images exist in `public/` (e.g. via `ls public`) and are non-empty.

### 3. Choose short codes

1. Decide on short codes for each dungeon to be used by `DungeonIcon`. Prefer:

   - 2–4 uppercase letters.
   - Intuitive mnemonics that are unlikely to collide with older seasons.

2. Example scheme (used historically in this repo):

   - `AA` – Algeth'ar Academy
   - `MAGT` – Magisters' Terrace
   - `MAI` – Maisara Caverns
   - `NPX` – Nexus-Point Xenas
   - `POS` – Pit of Saron
   - `SEAT` – Seat of the Triumvirate
   - `SKY` – Skyreach
   - `WIND` – Windrunner Spire

3. If reusing old keys or adding new ones for a future season, maintain consistency where practical but avoid breaking existing consumers that rely on historical keys.

### 4. Update `DungeonIcon/helper.ts`

1. Open `components/DungeonIcon/helper.ts`.

2. Ensure the `DungeonIconInfo` interface includes:

   - `url: string;`
   - `alt: string;`

3. Locate the `dungeonMap: Record<string, DungeonIconInfo>` object.

4. For each new season dungeon, add or update an entry:

   - Key: your chosen short code (e.g. `WIND`).
   - `url`: path to the corresponding file in `public/`, starting with `/`, e.g. `"/windrunner-spire.jpg"`.
   - `alt`: the full dungeon name, e.g. `"Windrunner Spire"`.

5. Keep the object alphabetically grouped or thematically grouped if that pattern is already used; otherwise just append at the end.

6. Do **not** remove old-season entries unless the user explicitly requests cleanup; they may still be referenced in historical data or UI.

### 5. Sanity-check usage

1. Confirm `components/DungeonIcon/index.tsx` still:

   - Calls `getDungeonInfo(shortCode)`.
   - Passes `dungeonInfo.url` and `dungeonInfo.alt` to `next/image`.

2. In the app, render at least one icon for each new dungeon using the new short codes and visually confirm:

   - The image loads without 404.
   - The aspect ratio looks acceptable.
   - The `alt` text is correct.

3. If any dungeon is renamed or replaced mid-season, repeat this workflow for that dungeon only, keeping filenames and codes consistent where feasible.

## Examples

### Example: Adding a new future-season dungeon

Suppose a new dungeon **“Depths of Xal’atath”** appears in the Archon data:

1. From `encounterRankingsSection`, you discover:

   - `name`: `"Depths of Xal'atath"`
   - `icon`: `"https://assets.rpglogs.com/img/warcraft/bosses/13000-icon.jpg?v=3"`

2. Save the icon:

   - Filename: `depths-of-xalatath.jpg`
   - Path: `public/depths-of-xalatath.jpg`

3. Pick a key: `DOX`.

4. Add to `dungeonMap`:

   - Key: `DOX`
   - `url: "/depths-of-xalatath.jpg"`
   - `alt: "Depths of Xal'atath"`

5. Use `<DungeonIcon dungeonShort="DOX" size={40} />` in the UI to render the icon.

