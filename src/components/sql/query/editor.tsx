import { SqlQuery } from '@/models/sql/query';
import { MySQL, sql } from '@codemirror/lang-sql';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { autocompletionPlugin } from './editor/plugins/autocompletion';
import { contentLinesPlugin } from './editor/plugins/contentLines';
import { gutterLinesPlugin } from './editor/plugins/gutterLines';

interface SqlQueryEditorProps {
  query?: SqlQuery;
}

export default function SqlQueryEditor(props: SqlQueryEditorProps) {
  const [isEditing, setEditing] = useState(false);
  const [isReadonly, setReadonly] = useState(false);

  return (
    <div className="w-full">
      <ReactCodeMirror
        value={props.query?.value}
        basicSetup={{
          foldGutter: false,
          lineNumbers: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          highlightSelectionMatches: false,
          drawSelection: false,
          dropCursor: true,
          indentOnInput: false,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: false,
          crosshairCursor: false,
          closeBracketsKeymap: false,
          searchKeymap: false,
          foldKeymap: false,
          completionKeymap: false,
          lintKeymap: false,
        }}
        readOnly={isReadonly}
        extensions={[
          sql({ upperCaseKeywords: true, dialect: MySQL }),
          gutterLinesPlugin,
          contentLinesPlugin,
          autocompletionPlugin,
        ]}
      />
    </div>
  );
}
