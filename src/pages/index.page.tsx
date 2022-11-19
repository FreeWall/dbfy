import Page from '@/components/layout/main/page';
import { useSession } from '@/contexts/session';
import { withSession } from '@/server/session/common';
import { getSessionStore } from '@/server/session/store';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import { leftTabs, rightTabs } from './index/tabs';

interface HomeProps {
  databases: string[];
}

export default function Home(props: HomeProps) {
  const session = useSession();

  const currentTab = 'databases';

  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>
      <Page
        breadcrumbs={[
          {
            name: (
              <>
                Server: <b>{session.credentials.h}</b>
              </>
            ),
            link: '/',
          },
          {
            name: 'Database',
            link: '/',
          },
          {
            name: 'Table',
            link: '/',
          },
        ]}
        tabs={{
          currentTab,
          leftTabs,
          rightTabs,
        }}
      >
        <div>
          {props.databases.map((database, idx) => (
            <div key={idx}>{database}</div>
          ))}
        </div>
      </Page>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement, props) {
  return <Layout {...props}>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = withSession<HomeProps>(async ({ req, res }) => {
  const sequelize = getSessionStore(req.session).sequelize;

  if (!sequelize) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session: req.session,
      databases: await sequelize.getDatabases(),
    },
  };
});
