import { useState } from 'react';
import SqlEditor from './query/editor';
import SqlPreview from './query/preview';
import Tooltip from './query/tooltip';

export default function SqlQuery(props: { query: string }) {
  const [isEditor, setEditor] = useState(false);

  return (
    <div
      className="relative flex"
      onMouseDown={() => setEditor(true)}
    >
      {isEditor && <SqlEditor query={props.query} />}
      {!isEditor && (
        <>
          <SqlPreview query={props.query} />
          <Tooltip text="34 ms" />
        </>
      )}
    </div>
  );
}
