import Layout from '@/components/layout';
import Spinner from '@/components/ui/spinner';
import TextInput, { TextInputProps } from '@/components/ui/textInput';
import { app } from '@/models/sql/constants';
import { withSession } from '@/server/session/common';
import { trpc } from '@/utils/trpc';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RefObject, useRef } from 'react';
import { CustomNextPage } from './_app.page';

interface TextField {
  name: string;
  type: TextInputProps['type'];
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  ref: RefObject<HTMLInputElement>;
}

const Login: CustomNextPage = () => {
  const login = trpc.login.useMutation();
  const router = useRouter();

  const fields: { [key: string]: TextField } = {
    server: {
      name: 'Server',
      type: 'text',
      placeholder: 'localhost',
      value: 'mysql-rfam-public.ebi.ac.uk:4497',
      ref: useRef<HTMLInputElement>(null),
    },
    username: {
      name: 'Username',
      type: 'text',
      value: 'rfamro',
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
    router.reload();
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
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <div
                className="cursor-pointer rounded-[3px] bg-dbfy-dark-icon py-2 px-4 font-semibold text-white hover:bg-dbfy-text"
                onClick={onLogin}
              >
                Login
              </div>
              {(login.data?.status == 'success' || login.isLoading) && (
                <div className="ml-4">
                  <Spinner size={24} />
                </div>
              )}
            </div>
          </div>
          {login.error && (
            <div className="mt-5 rounded-md bg-[#FFEAE6] p-5 py-4 text-[#cc0000] shadow-[0_0_8px_#c6d2db]">
              {login.error.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Login.getLayout = (page) => {
  return <Layout noSidebar={true}>{page}</Layout>;
};

export default Login;

export const getServerSideProps: GetServerSideProps = withSession(({ req, res }) => {
  if (req.session.crs) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
