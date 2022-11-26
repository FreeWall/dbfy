import { withAppContext } from '@/server/app';
import { getSessionStore } from '@/server/session/store';
import { CustomNextPage } from '@/types/app';
import Head from 'next/head';
import { createContext } from 'react';
import Layout from '../../components/layout';

interface DatabaseContextData {
  tables: string[];
}

export const DatabaseContext = createContext<DatabaseContextData>({
  tables: [],
});

interface DatabaseProps {
  database: string;
  tables: string[];
}

const Database: CustomNextPage<DatabaseProps> = (props) => {
  console.log(props);

  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <div className="bg-[3c3f41] container flex h-full flex-col items-center justify-center p-4">
        <h1 className="text-3xl">{props.table}</h1>
      </div>
    </>
  );
};

Database.getLayout = function getLayout(page) {
  return (
    <DatabaseContext.Provider
      value={{
        tables: page.props.tables,
      }}
    >
      <Layout sidebar={'database'}>{page}</Layout>
    </DatabaseContext.Provider>
  );
};

export default Database;

export const getServerSideProps = withAppContext<DatabaseProps>(async (context) => {
  const database = context.params?.id as string;

  const sequelize = getSessionStore(context.req.session).sequelize;

  if (!sequelize) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      database: database,
      tables: await sequelize.getTables(database),
    },
  };
});
