import Head from 'next/head';
import sqlLint from 'sql-lint';

import Layout from '../components/layout';
import SqlQuery from '../components/sql/query';

import type { NextPage } from 'next';
const query =
  "SELECT * FROM `forum_categories`\n\
WHERE cat_name = 'Lorem ipsum' OR cat_parent = 13\n\
ORDER BY cat_id ASC;\n\n\
DECLARE { @VARIABLE data_type [ = value ] }; -- some comment";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-[500px]">
          <SqlQuery query={query} />
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export async function getServerSideProps() {
  const errors = await sqlLint({
    sql: 'select * from ;',
    host: 'mysql-rfam-public.ebi.ac.uk',
    port: 4497,
    user: 'rfamro',
  });

  console.log(errors);

  return {
    props: {},
  };
}
