export type TabId = "experiences" | "projects" | "art";

export interface ProjectImage {
  id: string;
  fileName: string;
  alt: string;
  title: string;
}

export interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  heroFileName: string;
  screenshots: ProjectImage[];
}

export interface Experience {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  logoFileName: string;
}

export interface ArtPiece {
  id: string;
  date: string;
  fileName: string;
  title: string | null;
  description: string | null;
}

export interface SectionIntroData {
  intro: string;
  tags: string[] | null;
}

export interface SocialLink {
  label: string;
  fileName: string;
  href: string;
}

export interface SiteData {
  tabs: { id: TabId; label: string }[];
  staticData: {
    name: string; 
    about: string | null; 
    currently: string | null;
    projectIntro: SectionIntroData | null;
    artIntro: SectionIntroData | null;
    footer: string | null;
  }
  experiences: Experience[];
  softwareProjects: Project[];
  artPieces: ArtPiece[];
  links: SocialLink[];
}

// --- Google Sheets source config ---------------------------------------
// Substitute these for your own sheet. SPREADSHEET_ID/API_KEY come from
// env so they're never committed; the Config sheet's own location is the
// one thing that can't be self-describing, so it's a fixed constant.
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY!;
const CONFIG_SHEET_NAME = "Config";
const CONFIG_RANGE = "A2:C20";

// Static — not part of the sheet, since tabs are a code-level concern.
const TABS: SiteData["tabs"] = [
  { id: "experiences", label: "Experiences" },
  { id: "projects", label: "Projects" },
  { id: "art", label: "Art Gallery" },
];

type SheetKey =
  | "staticData"
  | "experiences"
  | "projects"
  | "artPieces"
  | "links";

const SHEET_KEYS: SheetKey[] = [
  "staticData",
  "experiences",
  "projects",
  "artPieces",
  "links",
];

type SheetLocation = { sheet: string; range: string };

const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

// --- Parsing helpers -----------------------------------------------------
// Lists are comma-delimited. Screenshots are a list of objects, so each
// entry is "fileName|title", entries separated by ";".
function splitList(value?: string): string[] {
  return value ? value.split(",").map((s) => s.trim()).filter(Boolean) : [];
}

function parseScreenshots(value?: string): ProjectImage[] {
  if (!value) return [];
  return value
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [fileName, title] = entry.split("|").map((s) => s.trim());
      return { id: fileName, fileName, alt: title, title };
    });
}

// --- Fetching --------------------------------------------------------------
async function fetchValues(sheet: string, range: string): Promise<string[][]> {
  const url = `${SHEETS_API_BASE}/${SPREADSHEET_ID}/values/${encodeURIComponent(
    `${sheet}!${range}`
  )}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${sheet}!${range}: ${res.status}`);
  const json = await res.json();
  return json.values ?? [];
}

// Reads the Config sheet to find where every other section actually lives,
// so sheet names/ranges can be rearranged without touching code.
async function fetchConfig(): Promise<Record<SheetKey, SheetLocation>> {
  const rows = await fetchValues(CONFIG_SHEET_NAME, CONFIG_RANGE);
  const config = {} as Record<SheetKey, SheetLocation>;
  for (const [key, sheet, range] of rows) {
    if (key) config[key as SheetKey] = { sheet, range };
  }
  return config;
}

async function fetchAllRanges(locations: Record<SheetKey, SheetLocation>): Promise<Record<SheetKey, string[][]>> {
  const ranges = SHEET_KEYS.map((key) => `${locations[key].sheet}!${locations[key].range}`);
  const url = `${SHEETS_API_BASE}/${SPREADSHEET_ID}/values:batchGet?${ranges
    .map((r) => `ranges=${encodeURIComponent(r)}`)
    .join("&")}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to batch fetch sheet data: ${res.status}`);
  const json = await res.json();
  const result = {} as Record<SheetKey, string[][]>;
  SHEET_KEYS.forEach((key, i) => {
    result[key] = json.valueRanges[i]?.values ?? [];
  });
  return result;
}

// --- Row -> typed object mapping -----------------------------------------
function rowsToExperiences(rows: string[][]): Experience[] {
  return rows
    .filter((r) => r[0])
    .map(([year, title, company, description, tags, logoFileName]) => ({
      id: year + title + company, 
      year, 
      title, 
      company, 
      description, 
      tags: splitList(tags), 
      logoFileName,
    }));
}

function rowsToProjects(rows: string[][]): Project[] {
  return rows
    .filter((r) => r[0])
    .map(([id, year, title, description, tags, heroFileName, screenshots]) => ({
      id, 
      year, 
      title, 
      description,
      tags: splitList(tags),
      heroFileName,
      screenshots: parseScreenshots(screenshots),
    }));
}

function rowsToArtPieces(rows: string[][]): ArtPiece[] {
  return rows
    .filter((r) => r[0])
    .map(([date, fileName, title, description]) => ({
      id: date + '_' + fileName,
      fileName: date + '_' + fileName,
      date, 
      title: !title ? null : title, 
      description: !description ? null : description, 
    }));
}

function rowsToLinks(rows: string[][]): SocialLink[] {
  return rows
    .filter((r) => r[0])
    .map(([fileName, label, href]) => ({ fileName, label, href }));
}

// --- Public entry point ----------------------------------------------------
export async function getSiteData(): Promise<SiteData> {
  try {
    const locations = await fetchConfig();
    const data = await fetchAllRanges(locations);

    const [
      [name], 
      [about], 
      [currently], 
      [projectIntroText, projectIntroTags], 
      [artIntroText, artIntroTags], 
      [footer]
    ] = data.staticData.map(([, ...r]) => r);

    return {
      staticData: { 
        name: name ?? "Auric Z.",
        about: about ?? null,
        currently: currently ?? null,
        projectIntro: projectIntroText ? { intro: projectIntroText, tags: splitList(projectIntroTags) } : null,
        artIntro: artIntroText ? { intro: artIntroText, tags: splitList(artIntroTags) } : null,
        footer: footer ?? null
      },
      tabs: TABS,
      experiences: rowsToExperiences(data.experiences),
      softwareProjects: rowsToProjects(data.projects),
      artPieces: rowsToArtPieces(data.artPieces),
      links: rowsToLinks(data.links),
    };
  }
  catch {
    return {
      staticData: { 
        name: "Auric Z.",
        about: "If you're reading this, something went wrong with getting data from Google Sheets.",
        currently: null,
        projectIntro: null,
        artIntro: null,
        footer: null
      },
      tabs: TABS,
      experiences: [],
      softwareProjects: [],
      artPieces: [],
      links: [],
    };
  }
}