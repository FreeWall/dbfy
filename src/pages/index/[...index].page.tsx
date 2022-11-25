import Page from '@/components/layout/main/page';
import { useSession } from '@/contexts/session';
import { withSession } from '@/server/session/common';
import { getSessionStore } from '@/server/session/store';
import { CustomNextPage } from '@/types/page';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import { tabs } from './tabs';

export interface HomeProps {
  currentTab: string;
}

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

export const getServerSideProps: GetServerSideProps<HomeProps> = withSession<HomeProps>(async (context) => {
  const currentTab = (context.params?.index as string) ?? 'databases';

  const sequelize = getSessionStore(context.req.session).sequelize;

  if (!sequelize) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session: context.req.session,
      currentTab,
      ...(await tabs[currentTab]?.component?.getServerSideProps?.(context)),
    },
  };
});
