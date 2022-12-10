import { CustomPage } from '@/types/app';
import Head from 'next/head';

interface ErrorPageProps {
  code: number;
  title: string;
}

const ErrorPageProps: CustomPage<ErrorPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>{`${props.code}: ${props.title} | dbfy`}</title>
      </Head>

      <div className="container flex h-full flex-col items-center justify-center bg-dbfy-sidebar p-4">
        <span className="pointer-events-none absolute select-none text-[400px] font-bold text-dbfy-light-icon opacity-20">
          {props.code}
        </span>
        <span className="absolute text-4xl font-bold text-dbfy-light-icon">{props.title}</span>
      </div>
    </>
  );
};

export function getStaticProps() {
  return {
    props: {
      code: 404,
      title: 'Page not found',
    },
  };
}

export default ErrorPageProps;
