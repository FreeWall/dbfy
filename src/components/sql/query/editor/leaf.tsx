import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';

import { prismClassMap } from './../prism';
import { RangeProps } from './decorate';

export interface LeafProps extends RenderLeafProps {
  leaf: Text & Pick<RangeProps, 'token' | 'pos'>;
}

export default function Leaf({ attributes, children, leaf }: LeafProps) {
  const className =
    leaf.token && typeof prismClassMap[leaf.token] !== 'undefined'
      ? prismClassMap.token + ' ' + prismClassMap[leaf.token]
      : '';

  return (
    <span
      {...attributes}
      className={
        className +
        (leaf.pos?.path[0] == 2 && leaf.pos?.start >= 0 && leaf.pos?.end <= 5 ? ' ' + prismClassMap.error : '')
      }
    >
      {children}
    </span>
  );
}
