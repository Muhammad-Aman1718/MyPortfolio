import { LEGAL_PAGES } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import LegalPage from "@/components/content/LegalPage";

export const metadata = pageMeta(LEGAL_PAGES.refund);

export default function Page() {
  return <LegalPage content={LEGAL_PAGES.refund} />;
}
