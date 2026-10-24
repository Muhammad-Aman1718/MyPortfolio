import Link from "next/link";
import { COPY } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

/** Primary panel offering a free discovery call. */
export default function BookingCard() {
  const { booking } = COPY.home;

  return (
    <Reveal
      variant="clip-up"
      className="flex flex-col justify-between gap-8 rounded-3xl bg-primary p-7 text-on-primary sm:p-8 md:p-10 lg:sticky lg:top-28 lg:min-h-105 lg:gap-10"
    >
      <span className="self-start rounded-full bg-black/15 px-3 py-1 text-xs font-medium">{booking.badge}</span>
      <div>
        <h3 className="h-display text-[38px] font-bold md:text-[46px]">{booking.title}</h3>
        <p className="mt-3 text-lg leading-relaxed">{booking.text}</p>
      </div>
      <Link href="/contact" className="btn-inverse justify-center self-start">
        {booking.cta} <Icon name="arrowRight" />
      </Link>
    </Reveal>
  );
}
