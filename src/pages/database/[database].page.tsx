import { GetServerSideProps } from 'next';

export default function Page() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const database = context.params?.database;

  return {
    redirect: {
      destination: '/database/' + database + '/structure',
      permanent: false,
    },
  };
};
