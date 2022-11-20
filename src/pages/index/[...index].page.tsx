import Page from '@/components/layout/main/page';
import { useSession } from '@/contexts/session';
import { withSession } from '@/server/session/common';
import { getSessionStore } from '@/server/session/store';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from '../../components/layout';
import { leftTabs, rightTabs } from './tabs';

export interface HomeProps {
  currentTab: string;
}

const DEFAULT_TAB = 'databases';

export default function Home(props: HomeProps) {
  const session = useSession();

  return (
    <>
      <Head>
        <title>dbfy [...index]</title>
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
            link: '/index',
          },
          {
            name: (
              <>
                Database: <b>realcraft</b>
              </>
            ),
            link: '/',
          },
        ]}
        tabs={{
          currentTab: props.currentTab,
          leftTabs,
          rightTabs,
        }}
      />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement, props: HomeProps) {
  return <Layout {...props}>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = withSession<HomeProps>(
  async ({ req, res, params }) => {
    const currentTab = (params?.index as string) ?? DEFAULT_TAB;

    const sequelize = getSessionStore(req.session).sequelize;

    if (!sequelize) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        session: req.session,
        currentTab,
        ...(await leftTabs[currentTab]?.page?.getServerSideProps?.({ req: req })),
      },
    };
  },
);
