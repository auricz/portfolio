"use client";

import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/utils/Skeleton";

// Minimal typings for the parts of the YouTube IFrame API used here.
interface YTPlayer {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  getPlayerState(): number;
  getIframe(): HTMLIFrameElement;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      host?: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, number>;
      events?: { onReady?: (event: { target: YTPlayer }) => void };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number; BUFFERING: number };
}

declare global {
  interface Window {
    YT?: Partial<YTNamespace>;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT as YTNamespace);
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT as YTNamespace);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("Failed to load the YouTube IFrame API"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

/**
 * Autoplaying YouTube embed. It plays as soon as it mounts and is destroyed
 * when it unmounts, so render it only while the modal is open. It also
 * pauses while the browser tab is hidden and resumes when it returns. A
 * skeleton covers it until the player is ready; key it by videoId so that
 * resets when the video changes.
 */
export default function YouTubePlayer({ videoId, title }: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let player: YTPlayer | null = null;
    let resumeOnVisible = false;

    // The API swaps its target element for an iframe, so hand it a throwaway
    // child instead of an element React owns.
    const target = document.createElement("div");
    container.appendChild(target);

    function pauseIfHidden() {
      if (!player || !document.hidden) return;
      const { PLAYING, BUFFERING } = window.YT!.PlayerState!;
      const state = player.getPlayerState();
      resumeOnVisible = resumeOnVisible || state === PLAYING || state === BUFFERING;
      player.pauseVideo();
    }

    function onVisibilityChange() {
      if (!player) return;
      if (document.hidden) {
        pauseIfHidden();
      } else if (resumeOnVisible) {
        resumeOnVisible = false;
        player.playVideo();
      }
    }

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        player = new YT.Player(target, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          
          playerVars: { autoplay: 1, playsinline: 1, rel: 0 },
          events: {
            onReady: ({ target: ready }) => {
              if (cancelled) return;
              setReady(true);
              ready.getIframe().title = title;
              // Autoplay may have started while the tab was already hidden.
              if (document.hidden) {
                resumeOnVisible = true;
                ready.pauseVideo();
              }
            },
          },
        });
      })
      .catch(() => {});

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      player?.destroy();
      container.replaceChildren();
    };
  }, [videoId, title]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {ready ? null : <Skeleton className="absolute inset-0" />}
    </div>
  );
}
