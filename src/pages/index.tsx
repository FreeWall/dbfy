import type { NextPage } from 'next';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-gray-900 font-sans text-7xl font-bold leading-normal">
          dbfy
        </h1>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
