import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';

import { prismClassMap } from './../prism';
import { RangeProps } from './decorate';
import { QueryError } from './error';

export interface LeafProps extends RenderLeafProps {
  leaf: Text & Pick<RangeProps, 'token' | 'pos'>;
  errors: QueryError[];
}

export default function Leaf({ attributes, children, leaf, errors }: LeafProps) {
  const className =
    leaf.token && typeof prismClassMap[leaf.token] !== 'undefined'
      ? prismClassMap.token + ' ' + prismClassMap[leaf.token]
      : '';

  const line = leaf.pos?.path[0];
  const hasError =
    errors.find((error) => (error.line ? error.line - 1 == line : false)) &&
    errors.find(
      (error) =>
        (leaf.pos?.start >= error.offset.start || leaf.pos?.end > error.offset.start) &&
        leaf.pos?.start <= error.offset.end,
    );

  return (
    <span
      {...attributes}
      className={className + (hasError ? ' ' + prismClassMap.error : '')}
    >
      {children}
    </span>
  );
}
