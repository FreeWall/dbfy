import Layout from '@/components/layout';
import { withAppContext } from '@/server/app';
import { getSessionStore } from '@/server/session/store';
import { CustomPage } from '@/types/app';
import { useEffect, useState } from 'react';
import { QueryTypes } from 'sequelize';
import { TablePage } from './_page';

interface TablesProps {
  database: string;
  table: string;
  columns: {
    name: string;
    type: string;
    collation: string;
  }[];
}

const Tables: CustomPage<TablesProps> = (props) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <TablePage
        currentDatabase={props.database}
        currentTable={props.table}
        currentTab="structure"
      >
        <div className="mt-5">
          <table>
            {hydrated &&
              props.columns.map((column, idx) => (
                <tr key={idx}>
                  <td>
                    <b>{column.name}</b>
                  </td>
                  <td>{column.type}</td>
                  <td>{column.collation}</td>
                </tr>
              ))}
          </table>
        </div>
      </TablePage>
    </>
  );
};

Tables.getLayout = (page) => {
  return <Layout sidebar={'database'}>{page}</Layout>;
};

export const getServerSideProps = withAppContext<TablesProps>(async (context) => {
  const database = context.params?.database as string;
  const table = context.params?.table as string;

  const sequelize = getSessionStore(context.req.session).sequelize;

  if (!sequelize) {
    return;
  }

  const data = await sequelize.query<{ [key: string]: string }>(
    'SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND table_name = ?',
    {
      type: QueryTypes.SELECT,
      replacements: [database, table],
    },
  );

  const columns: TablesProps['columns'] = [];

  for (const table of data) {
    columns.push({
      name: table['TABLE_NAME'] as string,
      type: table['COLUMN_TYPE'] as string,
      collation: table['COLLATION_NAME'] as string,
    });
  }

  return {
    props: {
      database,
      table,
      columns,
    },
  };
});

export default Tables;
