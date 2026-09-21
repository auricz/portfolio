import type { ProjectImage } from "@/lib/data";

// A YouTube video ID: exactly 11 URL-safe characters. Image filenames always
// have an extension (a dot), so the two can't be confused in the sheet.
export const YOUTUBE_ID_RE = /^[\w-]{11}$/;

// hqdefault is 4:3 with letterbox bars; object-cover in a 16:9 box crops
// exactly those bars away.
export function youtubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

// Still image shown for a project media item: the file itself for images,
// the YouTube thumbnail for videos.
export function projectImageSrc(projectId: string, image: ProjectImage): string {
  return image.youtubeId ? youtubeThumbnailUrl(image.youtubeId) : `/projects/${projectId}/${image.fileName}`;
}
