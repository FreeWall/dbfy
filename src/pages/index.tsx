import Head from 'next/head';
import Layout from '../components/layout';
import type { NextPage } from 'next';
import SqlQuery from '../components/sql/query';

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
