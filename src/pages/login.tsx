import Layout from '@/components/layout';
import TextInput, { TextInputProps } from '@/components/ui/TextInput';
import { app } from '@/models/sql/constants';
import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, RefObject, useRef } from 'react';

interface TextField {
  name: string;
  type: TextInputProps['type'];
  placeholder?: string;
  ref: RefObject<HTMLInputElement>;
}

export default function Login() {
  const login = trpc.login.useMutation();
  const router = useRouter();

  const fields: { [key: string]: TextField } = {
    server: {
      name: 'Server',
      type: 'text',
      placeholder: 'localhost',
      ref: useRef<HTMLInputElement>(null),
    },
    username: {
      name: 'Username',
      type: 'text',
      ref: useRef<HTMLInputElement>(null),
    },
    password: {
      name: 'Password',
      type: 'password',
      ref: useRef<HTMLInputElement>(null),
    },
  };

  function onLogin() {
    if (!fields.username?.ref.current?.value) {
      return;
    }

    login.mutate({
      server: fields.server?.ref.current?.value,
      username: fields.username?.ref.current?.value,
      password: fields.password?.ref.current?.value,
    });
  }

  if (login.data?.status == 'success') {
    router.push('/');
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
              {Object.values(fields).map((field, idx) => (
                <div
                  key={idx}
                  className="mb-3 last:mb-0"
                >
                  <div className="mb-[6px] font-medium">{field.name}</div>
                  <div>
                    <TextInput
                      ref={field.ref}
                      type="text"
                      placeholder={field.placeholder}
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
            {login.data?.status == 'failed' && <div>failed, try again</div>}
          </div>
          <div className="mt-10 opacity-60">
            <div>Example (public DB):</div>
            <br />
            <div>mysql-rfam-public.ebi.ac.uk:4497</div>
            <div>rfamro</div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout noSidebar={true}>{page}</Layout>;
};
