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
  'lorem_ipsum_dolor_actionlog',
  'lorem_ipsum_dolor_bans',
  'lorem_ipsum_dolor_bans_exceptions',
  'lorem_ipsum_dolor_chatcommands',
  'lorem_ipsum_dolor_chatlog',
  'lorem_ipsum_dolor_cosmetics',
  'lorem_ipsum_dolor_cosmetics_transactions',
  'lorem_ipsum_dolor_cosmetics_transactions_categories',
  'lorem_ipsum_dolor_forum_categories',
  'lorem_ipsum_dolor_forum_posts',
  'lorem_ipsum_dolor_forum_threads',
  'lorem_ipsum_dolor_forum_threads_views',
  'lorem_ipsum_dolor_friends',
  'lorem_ipsum_dolor_friends_requests',
  'lorem_ipsum_dolor_friends_settings',
  'lorem_ipsum_dolor_messages_posts',
  'lorem_ipsum_dolor_messages_threads',
  'lorem_ipsum_dolor_news',
  'lorem_ipsum_dolor_news_comments',
  'lorem_ipsum_dolor_permissions',
  'lorem_ipsum_dolor_permissions_entity',
  'lorem_ipsum_dolor_permissions_inheritance',
  'lorem_ipsum_dolor_polls',
  'lorem_ipsum_dolor_polls_comments',
  'lorem_ipsum_dolor_polls_votes',
  'lorem_ipsum_dolor_shops',
  'lorem_ipsum_dolor_shops_markets',
  'lorem_ipsum_dolor_shops_transactions',
  'lorem_ipsum_dolor_votes',
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
