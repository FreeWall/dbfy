import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';

const Table: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <div className="bg-[3c3f41] container flex h-full flex-col items-center justify-center p-4">
        <h1>{props.table}</h1>
      </div>
    </>
  );
};

Table.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Table;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      table: context.params?.id,
    },
  };
};
