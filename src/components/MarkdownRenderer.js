import { marked } from 'marked';

export default function MarkdownRenderer({ content }) {
  // Pre-process wiki links: [[Post Title]] -> [Post Title](/post/post-title)
  const processedContent = content.replace(/\[\[(.*?)\]\]/g, (match, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `[${title}](/post/${id})`;
  });

  const html = marked.parse(processedContent);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
