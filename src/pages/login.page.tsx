import Layout from '@/components/layout';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import TextInput, { TextInputProps } from '@/components/ui/textInput';
import { app } from '@/models/sql/constants';
import { withAppContext } from '@/server/app';
import { rememberExpirationDays } from '@/server/session/options';
import { CustomPage } from '@/types/app';
import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RefObject, useRef } from 'react';

interface TextField {
  name: string;
  type: TextInputProps['type'];
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  ref: RefObject<HTMLInputElement>;
}

const Login: CustomPage = () => {
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

  const rememberRef = useRef<HTMLInputElement>(null);

  function onLogin() {
    if (!fields.username?.ref.current?.value) {
      return;
    }

    if (login.isLoading || login.data?.status == 'success') {
      return;
    }

    login.mutate({
      server: fields.server?.ref.current?.value,
      username: fields.username?.ref.current?.value,
      password: fields.password?.ref.current?.value,
      remember: !!rememberRef.current?.checked,
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
          <div className="rounded-md bg-dbfy-input p-8 py-7 shadow-[0_0_8px_theme(colors.dbfy-border)]">
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
            <div className="flex items-center justify-between">
              <Button
                text="Login"
                loading={login.data?.status == 'success' || login.isLoading}
                onClick={onLogin}
              />
              <div className="ml-5">
                <Checkbox ref={rememberRef}>
                  <div
                    className="ml-2 inline-block cursor-pointer align-middle leading-none"
                    title={rememberExpirationDays + ' days of expiration'}
                  >
                    Remember me
                  </div>
                </Checkbox>
              </div>
            </div>
          </div>
          {login.error && (
            <div className="mt-5 rounded-md bg-[#FFEAE6] p-5 py-4 text-[#cc0000] shadow-[0_0_8px_theme(colors.dbfy-border)]">
              {login.error.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Login.getLayout = (page) => {
  return <Layout sidebar={false}>{page}</Layout>;
};

export default Login;

export const getServerSideProps = withAppContext(({ req, res }) => {
  if (req.session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
