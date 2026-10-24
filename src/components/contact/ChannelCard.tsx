import { UI } from "@/constants/constant";
import { cn, delayStyle } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { ChannelCardProps } from "@/types/types";

/** A way to reach me; the first (email) is the solid primary card. */
export default function ChannelCard({ channel, index }: ChannelCardProps) {
  const primary = index === 0;

  return (
    <a
      href={channel.href}
      {...(channel.external && { target: "_blank", rel: "noopener noreferrer" })}
      data-enter="left"
      style={delayStyle(UI.channelEnterAt + index * UI.channelEnterStep)}
      className={cn(
        "group flex items-center justify-between gap-4 rounded-3xl p-6 transition-colors duration-200",
        primary ? "bg-primary text-on-primary hover:bg-(--primary-hover)" : "bg-surface hover:bg-surface-hi",
      )}
    >
      <span className="min-w-0">
        <span className={cn("block text-sm", primary ? "text-white" : "text-subtle")}>{channel.label}</span>
        <span className="mt-1 block truncate font-display text-xl font-bold">{channel.value}</span>
        <span className={cn("mt-1 block text-sm", primary ? "text-white" : "text-muted")}>{channel.note}</span>
      </span>
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          primary ? "bg-black/20" : "bg-surface-hi",
        )}
      >
        <Icon name="arrowUpRight" />
      </span>
    </a>
  );
}
