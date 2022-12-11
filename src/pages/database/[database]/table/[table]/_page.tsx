import TableIcon from '@/components/icons/table.svg';
import Page from '@/components/layout/main/page';
import { useSession } from '@/contexts/app';
import Head from 'next/head';
import { memo, ReactElement } from 'react';
const MemoTableIcon = memo(TableIcon);

interface TablePageProps {
  currentDatabase: string;
  currentTable: string;
  currentTab: string;
  children: ReactElement;
}

export const TablePage = (props: TablePageProps) => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>{`Table: ${props.currentTable} | dbfy`}</title>
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
          {
            name: (
              <>
                Table: <b>{props.currentTable}</b>
              </>
            ),
            link: '/database/' + props.currentDatabase + '/table/' + props.currentTable,
          },
        ]}
        tabs={{
          currentTab: props.currentTab,
          tabs: {
            structure: {
              name: 'Structure',
              link: '/database/' + props.currentDatabase + '/table/' + props.currentTable + '/structure',
              icon: MemoTableIcon,
              type: 'left',
            },
            sql: {
              name: 'SQL',
              link: '/database/' + props.currentDatabase + '/table/' + props.currentTable + '/sql',
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
