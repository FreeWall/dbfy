import Layout from '@/components/layout';
import SqlQueryEditor from '@/components/sql/query/editor';
import { SqlQuery } from '@/models/sql/query';
import { withAppContext } from '@/server/app';
import { CustomPage } from '@/types/app';
import { HomePage } from './_page';

interface SqlProps {
  databases: string[];
}

const query: SqlQuery = {
  value:
    "SELECT * FROM `forum_categories`\n\
WHERE cat_name = 'Lorem ipsum' OR cat_parent = 13\n\
ORDER BY cat_id ASC;\n\n\
DECLARE { @VARIABLE data_type [ = value ] }; -- some comment",
};

const Sql: CustomPage<SqlProps> = () => {
  return (
    <>
      <HomePage currentTab="sql">
        <div className="mt-5">
          <SqlQueryEditor query={query} />
        </div>
      </HomePage>
    </>
  );
};

Sql.getLayout = (page) => {
  return <Layout sidebar={'server'}>{page}</Layout>;
};

export const getServerSideProps = withAppContext<SqlProps>();

export default Sql;
