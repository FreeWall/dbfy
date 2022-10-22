import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import SqlQueryEditor from '../components/sql/query/editor';
import SqlQueryStatic from '../components/sql/query/static';
import { SqlQuery } from '../models/sql/query';

const query: SqlQuery = {
  value:
    "SELECT * FROM `forum_categories`\n\
WHERE cat_name = 'Lorem ipsum' OR cat_parent = 13\n\
ORDER BY cat_id ASC;\n\n\
DECLARE { @VARIABLE data_type [ = value ] }; -- some comment",
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <main className="bg-[3c3f41] container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-[500px]">
          <SqlQueryEditor query={query} />
        </div>

        <div className="mt-10 w-[500px] rounded-[3px] border border-dbfy-border bg-dbfy-input px-[9px] py-2 pr-[42px] ">
          {[...Array(10)].map((x, i) => (
            <SqlQueryStatic
              key={i}
              query={"SELECT * FROM `forum_categories` WHERE cat_name = 'Lorem ipsum'"}
            />
          ))}
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

/*export async function getServerSideProps() {
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
}*/
