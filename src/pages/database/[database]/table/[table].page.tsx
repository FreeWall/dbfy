import { GetServerSideProps } from 'next';

export default function Page() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const database = context.params?.database;
  const table = context.params?.table;

  return {
    redirect: {
      destination: '/database/' + database + '/table/' + table + '/structure',
      permanent: false,
    },
  };
};
