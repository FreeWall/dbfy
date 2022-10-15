import { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';

import Decorate from './editor/decorate';
import Element from './editor/element';
import { QueryError } from './editor/error';
import Gutters from './editor/gutters';
import Leaf, { LeafProps } from './editor/leaf';
import { getDescendants, processValue } from './editor/value';

export default function QueryEditor(props: { query: string; focusOffset?: number }) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...(props as LeafProps)} />, []);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...{ ...props, editor, errors }} />, []);
  const decorate = Decorate;

  const onValueChange = (descendants: Descendant[]) => {
    const { value, lines } = processValue(descendants);
    setValue(value);
    setLines(lines);
  };

  const descendants = getDescendants(props.query);
  const { value: defaultValue, lines: defaultLines } = processValue(descendants);

  const [value, setValue] = useState(defaultValue);
  const [lines, setLines] = useState(defaultLines);
  const [errors, setErrors] = useState<QueryError[]>([]);

  useEffect(() => {
    ReactEditor.focus(editor);
    Transforms.select(editor, Editor.start(editor, []));
    Transforms.move(editor, {
      distance: props.focusOffset,
      unit: 'offset',
    });
  }, [editor, props.focusOffset]);

  return (
    <>
      <Slate
        editor={editor}
        value={descendants}
        onChange={onValueChange}
      >
        <div className="flex w-full whitespace-pre-line rounded-[3px] border border-dbfy-border bg-[#fff] font-mono text-xs leading-[1.4em]">
          <div className="select-none rounded-tl-[3px] rounded-bl-[3px] border-r border-r-dbfy-border bg-dbfy-input py-2 text-right text-dbfy-light-icon">
            <Gutters
              lines={lines}
              errors={errors}
            />
          </div>
          <Editable
            className="w-full py-2"
            decorate={decorate}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>
      <textarea
        value={value}
        readOnly
        style={{ width: '100%', height: '200px', border: '1px solid', display: 'none' }}
      ></textarea>
    </>
  );
}
