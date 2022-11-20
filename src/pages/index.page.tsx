import { GetServerSideProps } from 'next';

export default function Index() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: '/index/databases',
      permanent: false,
    },
  };
};
