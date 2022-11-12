import { project } from '@/models/sql/constants';
import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from '../layout';

export default function Login() {
  const inputs = [
    {
      name: 'Server',
      type: 'text',
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

  return (
    <>
      <Head>
        <title>dbfy</title>
      </Head>

      <div className="container flex h-full flex-col items-center bg-dbfy-sidebar p-4 pt-32">
        <div className="w-[300px]">
          <div className="mb-5 text-3xl font-bold text-dbfy-light-icon">{project.name}</div>
          <div className="rounded-md bg-dbfy-input p-8 py-7 shadow-[0_0_8px_#c6d2db]">
            <div className="mb-6">
              {inputs.map((input, idx) => (
                <div
                  key={idx}
                  className="mb-3 last:mb-0"
                >
                  <div className="mb-[6px] font-medium">{input.name}</div>
                  <div>
                    <input
                      type={input.type}
                      className="w-full rounded-[3px] border border-dbfy-border py-[6px] px-2"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <div className="cursor-pointer rounded-[3px] bg-dbfy-dark-icon py-2 px-4 font-semibold text-white hover:bg-dbfy-text">
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout noSidebar={true}>{page}</Layout>;
};
