import { SqlQuery } from '@/models/sql/query';
import { Grammar } from 'prismjs';

import Prism from '@/models/sql/prism';

interface SqlQueryStaticProps {
  query: string | SqlQuery;
}

export default function SqlQueryStatic(props: SqlQueryStaticProps) {
  const query = typeof props.query === 'string' ? props.query : props.query.value;

  return (
    <div
      className="font-mono text-xs leading-[1.4em]"
      dangerouslySetInnerHTML={{ __html: Prism.highlight(query, Prism.languages['sql'] as Grammar, 'sql') }}
    ></div>
  );
}
