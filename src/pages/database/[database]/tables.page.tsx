import Layout from '@/components/layout';
import Table from '@/components/ui/table';
import { withAppContext } from '@/server/app';
import { getSessionStore } from '@/server/session/store';
import { CustomPage } from '@/types/app';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import round from 'lodash/round';
import { useEffect, useState } from 'react';
import { QueryTypes } from 'sequelize';
import { DatabasePage } from './_page';

interface TablesProps {
  database: string;
  tables: {
    name: string;
    size: number;
  }[];
}

const Tables: CustomPage<TablesProps> = (props) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const table = useReactTable({
    data: hydrated ? props.tables : [],
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'size',
        header: 'Size',
        accessorFn: (row) => round(row.size / 1024 / 1024, 1) + ' MB',
      },
    ],
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DatabasePage
        currentDatabase={props.database}
        currentTab="tables"
      >
        <div className="mt-5">
          <Table table={table} />
        </div>
      </DatabasePage>
    </>
  );
};

Tables.getLayout = (page) => {
  return <Layout sidebar={'database'}>{page}</Layout>;
};

export const getServerSideProps = withAppContext<TablesProps>(async (context) => {
  const database = context.params?.database as string;

  const sequelize = getSessionStore(context.req.session).sequelize;

  if (!sequelize) {
    return;
  }

  const data = await sequelize.query<{ [key: string]: string }>(
    'SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?',
    {
      type: QueryTypes.SELECT,
      replacements: [database],
    },
  );

  const tables: TablesProps['tables'] = [];

  for (const table of data) {
    tables.push({
      name: table['TABLE_NAME'] as string,
      size: Number(table['DATA_LENGTH']),
    });
  }

  return {
    props: {
      database,
      tables,
    },
  };
});

export default Tables;
