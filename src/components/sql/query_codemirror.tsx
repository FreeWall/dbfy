import { sql } from '@codemirror/lang-sql';
import { EditorView, gutter, GutterMarker } from '@codemirror/view';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

function StaticQuery(props: { query: string }) {
  return (
    <div className="w-full whitespace-pre-line rounded-[3px] border border-dbfy-border bg-dbfy-input px-[9px] py-2 font-mono text-xs leading-[1.4em]">
      {props.query}
    </div>
  );
}

function Tooltip(props: { text?: string; loading?: boolean }) {
  return (
    <div className="pointer-events-none absolute top-2 right-[9px] text-xs font-medium text-dbfy-light-icon">
      <div className="inline-block align-middle">{props.text}</div>
      {props.loading && (
        <div className="border-spinner ml-2 h-4 w-4 border-[3px]"></div>
      )}
    </div>
  );
}

function QueryEditor(props: { query: string }) {
  return (
    <div className="w-full">
      <ReactCodeMirror
        value={props.query}
        basicSetup={{
          foldGutter: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          highlightSelectionMatches: false,
          drawSelection: false,
          dropCursor: true,
          indentOnInput: false,
        }}
        onCreateEditor={(view: EditorView) => {
          console.log(view.defaultLineHeight);
          gutter({
            lineMarker: (view, line, otherMarkers) => {
              console.log(line);

              return new (class extends GutterMarker {})();
            },
          });
        }}
        extensions={[sql({ upperCaseKeywords: true })]}
      />
      <Tooltip
        text={'Press [Esc] to cancel'}
        loading={true}
      />
    </div>
  );
}

export default function SqlQuery(props: { query: string }) {
  const [isEditor, setEditor] = useState(false);

  return (
    <div
      className="relative flex"
      onClick={() => setEditor(true)}
    >
      {isEditor && <QueryEditor query={props.query} />}
      {!isEditor && (
        <>
          <StaticQuery query={props.query} />
          <Tooltip
            text={'Press [Esc] to cancel'}
            loading={true}
          />
        </>
      )}
    </div>
  );
}
