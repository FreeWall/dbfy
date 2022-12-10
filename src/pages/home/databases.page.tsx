import Layout from '@/components/layout';
import { withAppContext } from '@/server/app';
import { getSessionStore } from '@/server/session/store';
import { CustomPage } from '@/types/app';
import round from 'lodash/round';
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

  return (
    <>
      <HomePage currentTab="databases">
        <div className="mt-5">
          <table>
            {hydrated &&
              props.databases.map((database, idx) => (
                <tr key={idx}>
                  <td>{database.name}</td>
                  <td align="right">{round(database.size / 1024 / 1024, 1) + ' MB'}</td>
                </tr>
              ))}
          </table>
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
