import { marked } from 'marked';

export default function MarkdownRenderer({ content }) {
  const html = marked.parse(content);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
