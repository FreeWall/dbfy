import { withSession } from '@/server/session/common';
import { getSessionStore } from '@/server/session/store';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from '../components/layout';

interface HomeProps {
  databases: [];
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>
      <div className="container flex h-full flex-col items-center justify-center p-4">
        <div>
          {props.databases.map((database, idx) => (
            <div key={idx}>{database}</div>
          ))}
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = withSession<HomeProps>(async ({ req, res }) => {
  const sequelize = getSessionStore(req.session).sequelize;

  if (!sequelize) {
    return;
  }

  return {
    props: {
      session: req.session,
      databases: await sequelize.getDatabases(),
    },
  };
});

export default Home;
