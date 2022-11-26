import { useSession } from '@/contexts/app';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import classNames from 'classnames';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import styles from './sidebar.module.css';
import Database from './sidebar/database';
import { Databases } from './sidebar/databases';
import Header from './sidebar/header';
import Server from './sidebar/server';

export interface SidebarProps {
  type: 'server' | 'database';
}

export default function Sidebar(props: SidebarProps) {
  const session = useSession();
  const [size, setSize] = useLocalStorage('size', 240);
  const [isResizing, setIsResizing] = useState(false);

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
      defaultSize={{ width: size, height: 'auto' }}
      size={{ width: size, height: 'auto' }}
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
        server={session.credentials.host + ':' + session.credentials.port}
        status="online"
      />
      {props.type == 'server' && <Databases />}
      {props.type == 'database' && <Database />}
    </Resizable>
  );
}
