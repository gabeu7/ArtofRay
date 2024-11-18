import MarkdownIt from 'markdown-it';

// Safer Version
const md = new MarkdownIt({
	html: false,  // Disable raw HTML
	linkify: true,
	typographer: true,
	// Add security features
	breaks: true,
	xhtmlOut: true,
	// Sanitize output
  });
  
// Add sanitization
import DOMPurify from 'isomorphic-dompurify';
  
export const parseMarkdown = (content: string): string => {
	const rendered = md.render(content);
	return DOMPurify.sanitize(rendered);
};

export const stripMarkdown = (content: string): string => {
  return md.renderInline(content);
};