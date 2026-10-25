import { YOUTUBE_EMBED_URL, YOUTUBE_ID_PATTERN } from "@/constants/constant";
import type { YouTubeProps } from "@/types/types";

/**
 * `<YouTube id="dQw4w9WgXcQ" title="…" />` — a privacy-enhanced embed built
 * only from a validated video id (an invalid id renders nothing).
 */
export default function YouTube({ id, title }: YouTubeProps) {
  if (!YOUTUBE_ID_PATTERN.test(id)) return null;
  return (
    <div className="aspect-video overflow-hidden rounded-[14px] border border-line bg-surface">
      <iframe
        src={`${YOUTUBE_EMBED_URL}${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
