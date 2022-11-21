import Page from '@/components/layout/main/page';
import { useSession } from '@/contexts/session';
import { withSession } from '@/server/session/common';
import { getSessionStore } from '@/server/session/store';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import { CustomNextPage } from '../_app.page';
import { tabs } from './tabs';

export interface HomeProps {
  currentTab: string;
}

const DEFAULT_TAB = 'databases';

const Home: CustomNextPage<HomeProps> = (props: HomeProps) => {
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
            link: '/login',
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
          tabs: tabs,
        }}
      />
    </>
  );
};

Home.getLayout = (page, props) => {
  return <Layout {...props}>{page}</Layout>;
};

export default Home;

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
        ...(await tabs[currentTab]?.component?.getServerSideProps?.({ req: req })),
      },
    };
  },
);
