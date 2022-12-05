import { GetServerSideProps } from 'next';

export default function Page() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/home/databases',
      permanent: false,
    },
  };
};
