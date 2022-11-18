import { useSession } from '@/contexts/session';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './sidebar.module.css';
import Database from './sidebar/database';
import Header from './sidebar/header';
import Server from './sidebar/server';
import Tables from './sidebar/tables';

export default function Sidebar() {
  const session = useSession();
  const [size, setSize] = useLocalStorage('size', 240);
  const [isResizing, setIsResizing] = useState(false);

  const { data } = useQuery('neco', async () => {
    const res = await fetch('/tables.json');
    return res.json();
  });

  const router = useRouter();

  return (
    <Resizable
      as="aside"
      className={classNames('bg-[2a2d2e] flex min-w-[240px] flex-col bg-dbfy-sidebar', {
        [styles.resizing as string]: isResizing,
      })}
      handleClasses={{
        right: styles.resizeHandle,
      }}
      handleStyles={{
        right: {
          cursor: 'e-resize',
        },
      }}
      enable={{ right: true }}
      defaultSize={{ width: size as number, height: 'auto' }}
      size={{ width: size as number, height: 'auto' }}
      maxWidth={'50%'}
      grid={[10, 0]}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(event, direction, refToElement) => {
        setSize(refToElement.offsetWidth);
        setIsResizing(false);
      }}
    >
      <Header />
      <Server
        server={session.credentials.h + ':' + session.credentials.p}
        status="online"
      />
      <Database />
      <Tables
        tables={data ? data : []}
        currentTable={(router.query.id as string) ?? undefined}
      />
    </Resizable>
  );
}
