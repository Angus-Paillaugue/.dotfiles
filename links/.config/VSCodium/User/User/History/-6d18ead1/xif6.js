import { compile } from 'mdsvex';
import highlighter from '$lib/codeHighlighter';

/**
 * Compiles the given Markdown string into HTML with syntax highlighting.
 *
 * @param {string} md - The Markdown string to compile.
 * @returns {Promise<string>} - A promise that resolves to the compiled HTML string.
 */
export async function compileMarkdown(md) {
	const compiled = (
		await compile(md, {
			highlight: { highlighter }
		})
	).code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>');
	return compiled;
}

export function stripMD(markdown) {
    // Strip headers
    let text = markdown.replace(/^#{1,6}\s+/gm, '');

    // Strip emphasis (bold, italic, etc.)
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2')   // bold
               .replace(/(\*|_)(.*?)\1/g, '$2');     // italic

    // Strip strikethrough
    text = text.replace(/~~(.*?)~~/g, '$1');

    // Strip inline code
    text = text.replace(/`([^`]+)`/g, '$1');

    // Strip blockquotes
    text = text.replace(/^\s*>+/gm, '');

    // Strip links (keep the link text)
    text = text.replace(/\[([^\]]+)]\([^)]+\)/g, '$1');

    // Strip images (keep the alt text)
    text = text.replace(/!\[([^\]]*)]\([^)]+\)/g, '$1');

    // Strip unordered lists
    text = text.replace(/^\s*[*+-]\s+/gm, '');

    // Strip ordered lists
    text = text.replace(/^\d+\.\s+/gm, '');

    // Strip horizontal rules
    text = text.replace(/^-{3,}$/gm, '');

    // Strip code blocks
    text = text.replace(/```[\s\S]*?```/g, '');

    // Return the cleaned text
    return text.trim();
}
