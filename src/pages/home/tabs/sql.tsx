import SqlQueryEditor from '@/components/sql/query/editor';
import { TabComponent } from '@/components/ui/tabs';
import { SqlQuery } from '@/models/sql/query';

const query: SqlQuery = {
  value:
    "SELECT * FROM `forum_categories`\n\
WHERE cat_name = 'Lorem ipsum' OR cat_parent = 13\n\
ORDER BY cat_id ASC;\n\n\
DECLARE { @VARIABLE data_type [ = value ] }; -- some comment",
};

const Sql: TabComponent = () => {
  return (
    <div className="mt-5">
      <SqlQueryEditor query={query} />
    </div>
  );
};

export default Sql;
