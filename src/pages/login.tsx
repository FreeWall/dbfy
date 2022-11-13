import Layout from '@/components/layout';
import { app } from '@/models/sql/constants';
import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import { ReactElement } from 'react';

export default function Login() {
  const login = trpc.login.useMutation();

  const fields = [
    {
      name: 'Server',
      type: 'text',
      placeholder: 'localhost',
    },
    {
      name: 'Username',
      type: 'text',
    },
    {
      name: 'Password',
      type: 'password',
    },
  ];

  function onLogin() {
    login.mutate({
      host: 'mysql-rfam-public.ebi.ac.uk:4497',
      username: 'rfamro',
    });
  }

  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <div className="container flex h-full flex-col items-center bg-dbfy-sidebar p-4 pt-32 smh:justify-center smh:py-0">
        <div className="w-[300px]">
          <div className="mb-5 text-dbfy-light-icon">
            <span className="group">
              <span className="group text-3xl font-bold">{app.name}</span>
              <span className="ml-1 hidden select-none text-xs font-semibold group-hover:inline">v{app.version}</span>
            </span>
          </div>
          <div className="rounded-md bg-dbfy-input p-8 py-7 shadow-[0_0_8px_#c6d2db]">
            <div className="mb-6">
              {fields.map((field, idx) => (
                <div
                  key={idx}
                  className="mb-3 last:mb-0"
                >
                  <div className="mb-[6px] font-medium">{field.name}</div>
                  <div>
                    <input
                      type={field.type}
                      className="w-full rounded-[3px] border border-dbfy-border py-[6px] px-2"
                      {...{ placeholder: field.placeholder }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <div
                className="cursor-pointer rounded-[3px] bg-dbfy-dark-icon py-2 px-4 font-semibold text-white hover:bg-dbfy-text"
                onClick={onLogin}
              >
                Login
              </div>
            </div>
            {login.isLoading && <div>loading...</div>}
          </div>
        </div>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout noSidebar={true}>{page}</Layout>;
};
