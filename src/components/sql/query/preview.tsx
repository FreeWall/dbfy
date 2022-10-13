import { Grammar } from 'prismjs';
import Prism from './prism';

export default function SqlPreview(props: { query: string }) {
  const html = Prism.highlight(props.query, Prism.languages['sql'] as Grammar, 'sql');

  return (
    <div
      className="w-full cursor-pointer whitespace-pre-line rounded-[3px] border border-dbfy-border bg-dbfy-input px-[9px] py-2 font-mono text-xs leading-[1.4em]"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
