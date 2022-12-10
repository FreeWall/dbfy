import TableIcon from '@/components/icons/table.svg';
import Page from '@/components/layout/main/page';
import { TabsProps } from '@/components/ui/tabs';
import { useSession } from '@/contexts/app';
import Head from 'next/head';
import { memo, ReactElement } from 'react';
const MemoTableIcon = memo(TableIcon);

const tabs: TabsProps['tabs'] = {
  databases: {
    name: 'Databases',
    link: '/home/databases',
    icon: MemoTableIcon,
    type: 'left',
  },
  privileges: {
    name: 'Privileges',
    link: '/home/privileges',
    icon: MemoTableIcon,
    type: 'left',
  },
  sql: {
    name: 'SQL',
    link: '/home/sql',
    type: 'right',
  },
};

interface HomePageProps {
  currentTab: string;
  children: ReactElement;
}

export const HomePage = (props: HomePageProps) => {
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
        ]}
        tabs={{
          currentTab: props.currentTab,
          tabs: tabs,
        }}
      >
        {props.children}
      </Page>
    </>
  );
};
