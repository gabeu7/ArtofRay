import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

export const parseMarkdown = (content: string): string => {
  return md.render(content);
};

export const stripMarkdown = (content: string): string => {
  return md.renderInline(content);
};