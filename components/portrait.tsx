import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Red-lit studio portrait (crimson backdrop baked into the image). Sizing and
 * corner radius come from the caller; `priority` for above-the-fold use.
 */
export default function Portrait({
  className = "",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#5a0018] ${className}`}>
      <Image
        src="/imgs/muhammad-aman.avif"
        alt={`${site.name}, ${site.role}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    </div>
  );
}
