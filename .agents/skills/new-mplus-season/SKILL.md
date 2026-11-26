---
name: new-mplus-season
description: >-
  Automates the process of updating both mplus-python and mplus-ui repositories for a new World of Warcraft Mythic+ season.
  Use whenever the user asks to roll over, start, transition, or update the application to a new Mythic+ season (e.g., Midnight Season 2, TWW Season 3).
---

# New Mythic+ Season Transition Guide

This skill coordinates the end-to-end configuration and asset setup across both `mplus-python` and `mplus-ui` repositories when rolling over to a new Mythic+ season.

## Repositories & Key Files

- **Backend**: `/home/hoffm670/repos/mplus-python`
  - Config: [`app/config.py`](file:///home/hoffm670/repos/mplus-python/app/config.py)
  - Static Data API: `https://raider.io/api/v1/mythic-plus/static-data?expansion_id=<EXPANSION_ID>`
  - Redeploy: [`redeploy.sh`](file:///home/hoffm670/repos/mplus-python/redeploy.sh)
- **Frontend**: `/home/hoffm670/repos/mplus-ui`
  - Dungeon Map Helper: [`components/DungeonIcon/helper.ts`](file:///home/hoffm670/repos/mplus-ui/components/DungeonIcon/helper.ts)
  - Public Assets: [`public/`](file:///home/hoffm670/repos/mplus-ui/public/)

---

## Workflow Steps

### Step 1: Identify Season Slug & Expansion ID

Map the requested season to the Raider.IO season slug format:
- **Midnight Season 1**: `season-mn-1` (Expansion ID: `11`)
- **Midnight Season 2**: `season-mn-2` (Expansion ID: `11`)
- **The War Within Season 1**: `season-tww-1` (Expansion ID: `11` or as specified)
- **The War Within Season 2**: `season-tww-2` (Expansion ID: `11`)
- **Dragonflight Season 4**: `season-df-4` (Expansion ID: `10` or `9`)

If uncertain about the expansion ID or slug, check Raider.IO static data or cutoffs endpoint:
`https://raider.io/api/v1/mythic-plus/season-cutoffs?season=<SEASON_SLUG>&region=us`

---

### Step 2: Update `mplus-python` Backend

1. Open [`/home/hoffm670/repos/mplus-python/app/config.py`](file:///home/hoffm670/repos/mplus-python/app/config.py).
2. Update `CURRENT_SEASON` to the new season slug in both `DEV_CONFIG` and `PROD_CONFIG`:
   ```python
   DEV_CONFIG = {
       REFRESH_ENDPOINT_TOGGLE: True,
       CURRENT_SEASON: "<NEW_SEASON_SLUG>",  # e.g., "season-mn-2"
       CURRENT_EXPANSION_ID: "<EXPANSION_ID>", # e.g., "11"
       ...
   }

   PROD_CONFIG = {
       REFRESH_ENDPOINT_TOGGLE: False,
       CURRENT_SEASON: "<NEW_SEASON_SLUG>",
       CURRENT_EXPANSION_ID: "<EXPANSION_ID>",
       ...
   }
   ```
3. If it is a new expansion, also update `CURRENT_EXPANSION_ID`.

---

### Step 3: Fetch & Verify Season Dungeons

1. Query Raider.IO static data or season dungeon rotation:
   `https://raider.io/api/v1/mythic-plus/static-data?expansion_id=<EXPANSION_ID>`
2. Inspect the dungeon list for the new season. Note each dungeon's:
   - `short_name` (e.g. `WS`, `DON`, `BV`)
   - `name` (e.g. `Windrunner Spire`, `Den of Nalorakk`, `The Blinding Vale`)
   - `slug` or image filename

---

### Step 4: Update `mplus-ui` Frontend

1. Open [`/home/hoffm670/repos/mplus-ui/components/DungeonIcon/helper.ts`](file:///home/hoffm670/repos/mplus-ui/components/DungeonIcon/helper.ts).
2. Check `dungeonMap` to ensure all dungeons in the rotation for the new season are mapped.
3. If any dungeon shortName is missing, add its entry:
   ```typescript
   SHORT_NAME: {
     url: "/<image-name>.jpg",
     alt: "<Full Dungeon Name>",
   },
   ```
4. Verify that the referenced `.jpg` image exists in [`/home/hoffm670/repos/mplus-ui/public/`](file:///home/hoffm670/repos/mplus-ui/public/).
   If missing, add or request the dungeon image in `public/`.

---

### Step 5: Verification & Review

1. Review changes in both repos:
   - `app/config.py` in `mplus-python`
   - `components/DungeonIcon/helper.ts` in `mplus-ui`
   - Ensure no syntax errors or typos.
2. Notify the user of all changes made across both repositories and suggest running tests or restarting the backend container if needed.

