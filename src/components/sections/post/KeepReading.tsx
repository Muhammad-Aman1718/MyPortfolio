import { COPY } from "@/constants/constant";
import Reveal from "@/components/ui/Reveal";
import PostCard from "@/components/content/PostCard";
import type { BlogListProps } from "@/types/types";

/** Suggested posts under an article. */
export default function KeepReading({ posts }: BlogListProps) {
  return (
    <section aria-labelledby="more" className="mx-auto mt-20 max-w-250 border-t border-line pt-10">
      <h2 id="more" className="font-display text-2xl font-semibold tracking-tight">
        {COPY.post.keepReading}
      </h2>
      <Reveal variant="fade-up" stagger className="mt-6 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Reveal>
    </section>
  );
}
