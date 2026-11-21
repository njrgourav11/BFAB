/**
 * Helpers that turn the HTML produced by the admin rich-text editor (Quill 2)
 * into clean, readable article markup. Pure string functions so they run on
 * the server (blog detail page) and in the browser (editor preview / save).
 *
 * Why this exists:
 *  - Quill 2's getSemanticHTML() turns EVERY space into `&nbsp;`, so saved
 *    posts never wrap and long lines overflow the page.
 *  - Pressing Enter twice stores empty `<p></p>` / `<p><br></p>` blocks, which
 *    render as random gaps once real paragraph spacing is applied.
 *  - Posts written before this fix may be plain text with `\n` line breaks.
 */

export interface BlogHeading {
    id: string;
    text: string;
    level: 2 | 3;
}

const decodeEntities = (s: string) =>
    s
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

export const stripHtml = (html: string) =>
    decodeEntities((html || '').replace(/<[^>]+>/g, ' '))
        .replace(/\s+/g, ' ')
        .trim();

export const wordCount = (html: string) => {
    const text = stripHtml(html);
    return text ? text.split(' ').length : 0;
};

export const readingTime = (html: string) => Math.max(1, Math.round(wordCount(html) / 220));

export const formatDate = (value: string | number | Date | undefined, style: 'long' | 'short' = 'long') => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: style === 'long' ? 'long' : 'short',
        year: 'numeric',
    });
};

/** First ~160 characters of the body, used when the author leaves the summary empty. */
export const autoExcerpt = (html: string, max = 160) => {
    const text = stripHtml(html);
    if (text.length <= max) return text;
    return text.slice(0, text.lastIndexOf(' ', max)).replace(/[,.;:!?-]+$/, '') + '…';
};

const slugifyHeading = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
        .slice(0, 60) || 'section';

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Old posts saved as plain text: blank line = new paragraph, single newline = line break. */
const plainTextToHtml = (text: string) =>
    text
        .replace(/\r\n?/g, '\n')
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
        .join('');

/**
 * Clean editor HTML. Safe to run repeatedly (idempotent).
 * Use before saving a post and before rendering one.
 */
export function normalizeBlogHtml(input: string): string {
    if (!input) return '';
    let html = input.trim();

    if (!/<[a-z][\s\S]*>/i.test(html)) return plainTextToHtml(html);

    html = html
        // 1. Real spaces so text wraps. Quill writes every space as &nbsp;
        .replace(/&nbsp;| /g, ' ')
        // 2. Strip anything executable (posts are written by admins, but be safe)
        .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
        .replace(/<[a-z][^>]*>/gi, (tag) =>
            tag
                .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
                .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"')
        )
        // 3. Quill's cursor placeholder
        .replace(/<span class="ql-cursor">[\s\S]*?<\/span>/g, '')
        // 4. Trailing <br> inside a block is invisible noise
        .replace(/(?:<br\s*\/?>\s*)+<\/(p|h[1-6]|li|blockquote)>/gi, '</$1>');

    // 5. Empty blocks (blank lines typed with Enter) – spacing is handled by CSS
    html = html.replace(/<(p|h[1-6]|blockquote|li)(\s[^>]*)?>\s*<\/\1>/gi, '');

    // 6. Single spaces between words; keep code blocks untouched
    const parts = html.split(/(<pre[\s\S]*?<\/pre>)/gi);
    html = parts.map((part, i) => (i % 2 === 1 ? part : part.replace(/ {2,}/g, ' '))).join('');

    // 7. Images: lazy-load, never wider than the column (handled in CSS)
    html = html.replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"');

    // 8. External links open in a new tab
    html = html.replace(/<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (match, before, href, after) => {
        if (/target=/.test(match)) return match;
        return `<a ${before}href="${href}"${after} target="_blank" rel="noopener noreferrer">`;
    });

    return html.trim();
}

/**
 * Normalise + give every h2/h3 a stable id so the table of contents can link to it.
 * h1 inside the body is demoted to h2 (the page title is the only h1).
 */
export function prepareBlogHtml(input: string): { html: string; headings: BlogHeading[] } {
    const used = new Map<string, number>();
    const headings: BlogHeading[] = [];

    const html = normalizeBlogHtml(input)
        .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
        .replace(/<\/h1>/gi, '</h2>')
        .replace(/<h([23])((?:\s[^>]*)?)>([\s\S]*?)<\/h\1>/gi, (_m, level: string, attrs: string, inner: string) => {
            const text = stripHtml(inner);
            if (!text) return '';
            const cleanAttrs = (attrs || '').replace(/\sid="[^"]*"/i, '');
            const base = slugifyHeading(text);
            const n = used.get(base) ?? 0;
            used.set(base, n + 1);
            const id = n ? `${base}-${n + 1}` : base;
            headings.push({ id, text, level: Number(level) as 2 | 3 });
            return `<h${level} id="${id}"${cleanAttrs}>${inner}</h${level}>`;
        });

    return { html, headings };
}
