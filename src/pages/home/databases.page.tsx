import Layout from '@/components/layout';
import Table from '@/components/ui/table';
import { withAppContext } from '@/server/app';
import { getSessionStore } from '@/server/session/store';
import { CustomPage } from '@/types/app';
import { filesize } from '@/utils/filesize';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { QueryTypes } from 'sequelize';
import { HomePage } from './_page';

interface DatabasesProps {
  databases: {
    name: string;
    size: number;
  }[];
}

const Databases: CustomPage<DatabasesProps> = (props) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const table = useReactTable({
    data: hydrated ? props.databases : [],
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'size',
        header: 'Size',
        accessorFn: (row) => filesize(row.size),
      },
    ],
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <HomePage currentTab="databases">
        <div className="mt-5">
          <Table table={table} />
        </div>
      </HomePage>
    </>
  );
};

Databases.getLayout = (page) => {
  return <Layout sidebar={'server'}>{page}</Layout>;
};

export const getServerSideProps = withAppContext<DatabasesProps>(async ({ req }) => {
  const sequelize = getSessionStore(req.session).sequelize;

  if (!sequelize) {
    return;
  }

  const data = await sequelize.query<{ [key: string]: string }>(
    'SELECT TABLE_SCHEMA, SUM(DATA_LENGTH + INDEX_LENGTH) AS SIZE FROM information_schema.TABLES GROUP BY TABLE_SCHEMA',
    {
      type: QueryTypes.SELECT,
    },
  );

  const databases: DatabasesProps['databases'] = [];

  for (const database of data) {
    databases.push({
      name: database['TABLE_SCHEMA'] as string,
      size: Number(database['SIZE']),
    });
  }

  return {
    props: {
      databases,
    },
  };
});

export default Databases;
