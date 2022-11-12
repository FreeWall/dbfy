import { useSession } from '@/server/session/context';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
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

const credentials = {
  host: 'mysql-rfam-public.ebi.ac.uk',
  port: 4497,
  username: 'rfamro',
};

const Home: NextPage = (props) => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <div className="bg-[3c3f41] container flex h-full flex-col items-center justify-center p-4">
        <div className="w-[500px]">
          <SqlQueryEditor query={query} />
        </div>

        <div className="mt-10 w-[500px] rounded-[3px] border border-dbfy-border bg-dbfy-input px-[9px] py-2 pr-[42px]">
          {[...Array(10)].map((x, i) => (
            <SqlQueryStatic
              key={i}
              query={"SELECT * FROM `forum_categories` WHERE cat_name = 'Lorem ipsum'"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  /* const sequelize = new Sequelize({
    dialect: 'mysql',
    host: credentials.host,
    port: credentials.port,
    username: credentials.username,
  });

  await sequelize.authenticate();

  const [neco] = await sequelize.query('show databases');
  console.log(neco); */

  return {
    props: {},
  };
};

export default Home;
