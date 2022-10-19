import { useLocalStorage } from '@/hooks/useLocalStorage';
import classNames from 'classnames';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import styles from './sidebar.module.css';
import Database from './sidebar/database';
import Header from './sidebar/header';
import Server from './sidebar/server';
import Tables from './sidebar/tables';

const tables = [
  'actionlog',
  'bans',
  'bans_exceptions',
  'chatcommands',
  'chatlog',
  'cosmetics',
  'cosmetics_transactions',
  'forum_categories',
  'forum_posts',
  'forum_threads',
  'forum_threads_views',
  'friends',
  'friends_requests',
  'friends_settings',
  'messages_posts',
  'messages_threads',
  'news',
  'news_comments',
  'permissions',
  'permissions_entity',
  'permissions_inheritance',
  'polls',
  'polls_comments',
  'polls_votes',
  'shops',
  'shops_markets',
  'shops_transactions',
  'votes',
];

export default function Sidebar() {
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
        server="localhost:3306"
        status="online"
      />
      <Database />
      <Tables
        tables={tables}
        currentTable={'forum_categories'}
      />
    </Resizable>
  );
}
