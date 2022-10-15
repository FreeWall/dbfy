import { Token } from 'prismjs';
import { NodeEntry, Range, Text } from 'slate';

import Prism from './../prism';

const getLength = (token: Token | string): number => {
  if (typeof token === 'string') {
    return token.length;
  } else if (typeof token.content === 'string') {
    return token.content.length;
  } else if (Array.isArray(token.content)) {
    return token.content.reduce((l, t) => l + getLength(t), 0);
  }

  return 0;
};

export interface RangeProps extends Range {
  token: string | null;
  pos: {
    path: number[];
    start: number;
    end: number;
  };
}

export default function Decorate([node, path]: NodeEntry): RangeProps[] {
  const ranges: RangeProps[] = [];

  if (!Text.isText(node)) {
    return ranges;
  }

  const tokens = Prism.tokenize(node.text, Prism.languages['sql'] as Prism.Grammar);

  let start = 0;

  for (const token of tokens) {
    const length = getLength(token);
    const end = start + length;

    ranges.push({
      token: typeof token !== 'string' ? token.type : null,
      pos: {
        path,
        start,
        end,
      },
      anchor: { path, offset: start },
      focus: { path, offset: end },
    });

    start = end;
  }

  return ranges;
}
