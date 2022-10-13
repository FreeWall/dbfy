import Table from '../../icons/table.svg';

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

export default function Tables() {
  return (
    <div className="break-all text-[12px] font-medium leading-[1.9em]">
      {tables.map((table) => (
        <div
          key={table}
          className="cursor-pointer px-[20px] hover:bg-dbfy-border"
        >
          <div className="mr-2 inline-block w-4 fill-dbfy-dark-icon align-middle">
            <Table />
          </div>
          <div className="inline-block align-middle">{table}</div>
        </div>
      ))}
    </div>
  );
}
