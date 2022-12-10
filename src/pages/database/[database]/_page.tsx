import TableIcon from '@/components/icons/table.svg';
import Page from '@/components/layout/main/page';
import { useSession } from '@/contexts/app';
import Head from 'next/head';
import { memo, ReactElement } from 'react';
const MemoTableIcon = memo(TableIcon);

interface DatabasePageProps {
  currentDatabase: string;
  currentTab: string;
  children: ReactElement;
}

export const DatabasePage = (props: DatabasePageProps) => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>{`Server: ${session.credentials.host} | dbfy`}</title>
      </Head>
      <Page
        breadcrumbs={[
          {
            name: (
              <>
                Server: <b>{session.credentials.host + ':' + session.credentials.port}</b>
              </>
            ),
            link: '/',
          },
          {
            name: (
              <>
                Database: <b>{props.currentDatabase}</b>
              </>
            ),
            link: '/database/' + props.currentDatabase,
          },
        ]}
        tabs={{
          currentTab: props.currentTab,
          tabs: {
            tables: {
              name: 'Tables',
              link: '/database/' + props.currentDatabase + '/tables',
              icon: MemoTableIcon,
              type: 'left',
            },
            sql: {
              name: 'SQL',
              link: '/database/' + props.currentDatabase + '/sql',
              type: 'right',
            },
          },
        }}
      >
        {props.children}
      </Page>
    </>
  );
};
