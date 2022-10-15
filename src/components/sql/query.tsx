import { useState } from 'react';

import QueryEditor from './query/editor';
import QueryPreview from './query/preview';
import QueryTooltip from './query/tooltip';

export default function SqlQuery(props: { query: string }) {
  const [isEditor, setEditor] = useState(false);
  const [editorOffset, setEditorOffset] = useState(0);

  return (
    <div className="relative">
      {isEditor && (
        <QueryEditor
          query={props.query}
          focusOffset={editorOffset}
        />
      )}
      {!isEditor && (
        <>
          <QueryPreview
            query={props.query}
            onClick={(offset) => {
              setEditor(true);
              setEditorOffset(offset);
            }}
          />
          <QueryTooltip text="34 ms" />
        </>
      )}
    </div>
  );
}
