import TableIcon from '@/components/icons/table.svg';
import Layout from '@/components/layout';
import Page from '@/components/layout/main/page';
import { useSession } from '@/contexts/app';
import { withAppContext } from '@/server/app';
import { getSessionStore } from '@/server/session/store';
import { CustomNextPage } from '@/types/app';
import Head from 'next/head';
import { createContext, memo } from 'react';
import Tables from './tabs/tables';
const MemoTableIcon = memo(TableIcon);

interface DatabaseContextData {
  tables: string[];
}

export const DatabaseContext = createContext<DatabaseContextData>({
  tables: [],
});

interface DatabaseProps {
  currentTab: string;
  database: string;
  tables: string[];
}

const Database: CustomNextPage<DatabaseProps> = (props) => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>{`Database: ${props.database} | dbfy`}</title>
      </Head>
      <Page
        pageProps={props}
        breadcrumbs={[
          {
            name: (
              <>
                Server: <b>{session.credentials.host + ':' + session.credentials.port}</b>
              </>
            ),
            link: '/',
          },
          {
            name: (
              <>
                Database: <b>{props.database}</b>
              </>
            ),
            link: '/database/' + props.database,
          },
        ]}
        tabs={{
          currentTab: props.currentTab,
          tabs: {
            tables: {
              name: 'Tables',
              link: '/database/' + props.database + '/tables',
              icon: MemoTableIcon,
              component: Tables,
              type: 'left',
            },
          },
        }}
      />
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
  const database = context.params?.database as string;
  const currentTab = (context.params?.tab as string) ?? 'databases';

  const sequelize = getSessionStore(context.req.session).sequelize;

  if (!sequelize) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      currentTab,
      database,
      tables: await sequelize.getTables(database),
    },
  };
});
