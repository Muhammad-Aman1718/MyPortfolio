import { compileMdx } from "@/lib/mdx/compile";
import { cn } from "@/utils/style";
import Callout from "./Callout";
import Figure from "./Figure";
import MdxHeading from "./MdxHeading";
import MdxImage from "./MdxImage";
import MdxLink from "./MdxLink";
import MdxPre from "./MdxPre";
import MdxTable from "./MdxTable";
import Quote from "./Quote";
import YouTube from "./YouTube";
import type { MdxContentProps } from "@/types/types";

/**
 * Renders an article's MDX on the server. Markdown elements map to the site's
 * components, and `<Callout>`, `<Quote>`, `<Figure>` and `<YouTube>` can be
 * used directly in .mdx files. Spacing and type live in `.mdx` (globals.css).
 */
export default async function MdxContent({ source, numbered = false }: MdxContentProps) {
  const Content = await compileMdx(source);

  return (
    <div className={cn("mdx", numbered && "mdx-numbered")}>
      <Content
        components={{
          h2: (props) => <MdxHeading level={2} {...props} />,
          h3: (props) => <MdxHeading level={3} {...props} />,
          a: MdxLink,
          img: MdxImage,
          pre: MdxPre,
          table: MdxTable,
          blockquote: Quote,
          Callout,
          Quote,
          Figure,
          YouTube,
        }}
      />
    </div>
  );
}
