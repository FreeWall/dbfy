import Prism, { prismClassMap } from './prism';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Descendant, Text } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const getLength = (token) => {
  if (typeof token === 'string') {
    return token.length;
  } else if (typeof token.content === 'string') {
    return token.content.length;
  } else {
    return token.content.reduce((l, t) => l + getLength(t), 0);
  }
};

export default function SqlEditor(props: { query: string }) {
  const language = 'sql';
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const initialValue: Descendant[] = [
    {
      children: [
        {
          text: props.query,
        },
      ],
    },
  ];

  const decorate = useCallback(
    ([node, path]) => {
      const ranges = [];

      if (!Text.isText(node)) {
        return ranges;
      }

      const tokens = Prism.tokenize(node.text, Prism.languages[language] as Prism.Grammar);

      let start = 0;

      for (const token of tokens) {
        const length = getLength(token);
        const end = start + length;

        if (typeof token !== 'string') {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          });
        }

        start = end;
      }

      return ranges;
    },
    [language],
  );

  return (
    <Slate
      editor={editor}
      value={initialValue}
    >
      <Editable
        className="w-full whitespace-pre-line rounded-[3px] border border-dbfy-border bg-[#fff] px-[9px] py-2 font-mono text-xs leading-[1.4em]"
        decorate={decorate}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
}

const Leaf = ({ attributes, children, leaf }) => {
  let className = '';
  for (const keyword in prismClassMap) {
    if (typeof leaf[keyword] !== 'undefined') {
      className = (prismClassMap.token + ' ' + prismClassMap[keyword]) as string;
      break;
    }
  }

  return (
    <span
      {...attributes}
      className={className}
    >
      {children}
    </span>
  );
};
