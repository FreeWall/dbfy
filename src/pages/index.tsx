import { withSession } from '@/server/session/common';
import { getSessionStore } from '@/server/session/store';
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

interface HomeProps {
  databases: {
    Database: string;
  }[];
}

const Home: NextPage<HomeProps> = (props) => {
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

        <div>
          {props.databases.map((database, idx) => (
            <div key={idx}>{database.Database}</div>
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
  const store = getSessionStore(req.session);

  return {
    props: {
      session: req.session,
      databases: (await store.sequelize?.query('show databases'))?.[0],
    },
  };
});

export default Home;
