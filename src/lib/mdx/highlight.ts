import "server-only";
import { createHighlighter } from "shiki";
import type { Highlighter } from "shiki";
import { visit } from "unist-util-visit";
import type { Element, ElementContent, Root } from "hast";
import { CODE_LANGUAGE_LABELS, CODE_LANGUAGES, CODE_THEME } from "@/constants/constant";
import type { CodeMeta } from "@/types/types";

/** One highlighter for the whole build (loading grammars is the slow part). */
let highlighter: Promise<Highlighter> | undefined;
const getHighlighter = () => (highlighter ??= createHighlighter({ themes: [CODE_THEME], langs: CODE_LANGUAGES }));

/** All text inside a node — the code exactly as written. */
const textOf = (node: ElementContent): string =>
  node.type === "text" ? node.value : node.type === "element" ? node.children.map(textOf).join("") : "";

/** "{1,3-5}" → {1, 3, 4, 5} */
const parseLineRanges = (ranges: string): Set<number> =>
  new Set(
    ranges.split(",").flatMap((range) => {
      const [start, end = start] = range.split("-").map(Number);
      return Number.isInteger(start) && Number.isInteger(end)
        ? Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i)
        : [];
    }),
  );

/** Reads `title="file.ts"`, `{2,4-6}` and `showLineNumbers` from a fence's meta string. */
export function parseCodeMeta(meta = ""): CodeMeta {
  return {
    title: meta.match(/title=(?:"([^"]*)"|'([^']*)')/)?.slice(1).find(Boolean),
    highlightLines: parseLineRanges(meta.match(/\{([\d,\s-]+)\}/)?.[1].replace(/\s/g, "") ?? ""),
    lineNumbers: /\bshowLineNumbers\b/.test(meta),
  };
}

/**
 * Rehype plugin: highlights every fenced code block on the server with Shiki
 * (zero client JS) and annotates the <pre> for the CodeBlock component — the
 * raw code for the copy button, a language label and an optional title.
 * Unknown languages fall back to plain text instead of failing the build.
 */
export default function rehypeCodeBlocks() {
  return async (tree: Root) => {
    const shiki = await getHighlighter();
    const loaded = new Set(shiki.getLoadedLanguages());
    const blocks: { pre: Element; parent: { children: unknown[] }; index: number }[] = [];

    visit(tree, "element", (node, index, parent) => {
      const code = node.tagName === "pre" ? node.children[0] : undefined;
      if (code?.type === "element" && code.tagName === "code" && parent && index !== undefined) {
        blocks.push({ pre: node, parent, index });
      }
    });

    for (const { pre, parent, index } of blocks) {
      const code = pre.children[0] as Element;
      const classes = Array.isArray(code.properties.className) ? code.properties.className.map(String) : [];
      const requested = classes.find((name) => name.startsWith("language-"))?.slice("language-".length) ?? "text";
      const lang = loaded.has(requested) ? requested : "text";
      const meta = parseCodeMeta((code.data as { meta?: string } | undefined)?.meta);
      const raw = textOf(code).replace(/\n$/, "");

      const highlighted = shiki.codeToHast(raw, {
        lang,
        theme: CODE_THEME,
        transformers: [
          {
            line(node, line) {
              if (meta.highlightLines.has(line)) this.addClassToHast(node, "highlighted");
            },
          },
        ],
      });
      const result = highlighted.children[0] as Element;
      result.properties = {
        ...result.properties,
        dataRaw: raw,
        dataLanguage: CODE_LANGUAGE_LABELS[requested] ?? requested.toUpperCase(),
        dataTitle: meta.title,
        dataLineNumbers: meta.lineNumbers ? "" : undefined,
      };
      parent.children[index] = result;
    }
  };
}
