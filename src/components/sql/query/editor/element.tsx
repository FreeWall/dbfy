import { ReactEditor, RenderElementProps } from 'slate-react';
import { QueryError } from './error';

export interface ElementProps extends RenderElementProps {
  editor: ReactEditor;
  errors: QueryError[];
}

export default function Element({ attributes, children, element, editor, errors }: ElementProps) {
  const line = ReactEditor.findPath(editor, element)[0];
  const hasError = errors.find((error) => (error.line ? error.line - 1 == line : false));

  return (
    <div
      {...attributes}
      className={'px-[9px] ' + (hasError ? 'bg-[#FFEAE6]' : '')}
    >
      {children}
    </div>
  );
}
