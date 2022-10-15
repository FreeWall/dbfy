import { Grammar } from 'prismjs';
import { useCallback, useRef } from 'react';

import Prism from './prism';

export default function QueryPreview(props: { query: string; onClick?: (offset: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const html = Prism.highlight(props.query, Prism.languages['sql'] as Grammar, 'sql');

  const onClick = useCallback(() => {
    if (!document.getSelection()?.isCollapsed) {
      return;
    }

    const range = window.getSelection()?.getRangeAt(0);
    const preCaretRange = range?.cloneRange();
    if (range && preCaretRange) {
      preCaretRange.selectNodeContents(ref.current as HTMLDivElement);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      props.onClick?.call(null, preCaretRange.toString().length);
    }
  }, []);

  return (
    <div
      className="w-full cursor-text whitespace-pre-line rounded-[3px] border border-dbfy-border bg-dbfy-input px-[9px] py-2 pr-[42px] font-mono text-xs leading-[1.4em] hover:border-dbfy-light-icon"
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={onClick}
      ref={ref}
    ></div>
  );
}
