import { withAppContext } from '@/server/app';
import { CustomNextPage } from '@/types/app';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';

const Table: CustomNextPage = (props) => {
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

Table.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Table;

export const getServerSideProps: GetServerSideProps = withAppContext(async ({ req, res, params }) => {
  return {
    props: {
      session: req.session,
      table: params?.id,
    },
  };
});
