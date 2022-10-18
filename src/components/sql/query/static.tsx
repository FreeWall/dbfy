import { Grammar } from 'prismjs';
import { useMemo } from 'react';
import { SqlQuery } from '../../../models/sql/query';

import Prism from '../../../models/sql/prism';

interface SqlQueryStaticProps {
  query: string | SqlQuery;
}

export default function SqlQueryStatic(props: SqlQueryStaticProps) {
  const query = typeof props.query === 'string' ? props.query : props.query.value;
  const html = useMemo(() => Prism.highlight(query, Prism.languages['sql'] as Grammar, 'sql'), [query]);

  return (
    <div
      className="font-mono text-xs leading-[1.4em]"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
