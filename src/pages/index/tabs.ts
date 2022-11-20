import { TabsProps } from '@/components/ui/tabs';
import { memo } from 'react';
import TableIcon from './../../components/icons/table.svg';
import Databases from './tabs/databases';
import Privileges from './tabs/privileges';
import Sql from './tabs/sql';
import { HomeProps } from './[...index].page';
const MemoTableIcon = memo(TableIcon);

export const leftTabs: TabsProps<HomeProps>['leftTabs'] = {
  databases: {
    name: 'Databases',
    icon: MemoTableIcon,
    link: '/index/databases',
    page: Databases,
  },
  privileges: {
    name: 'Privileges',
    link: '/index/privileges',
    page: Privileges,
  },
  export: {
    name: 'Export',
  },
  import: {
    name: 'Import',
  },
};

export const rightTabs: TabsProps<HomeProps>['rightTabs'] = {
  sql: {
    name: 'SQL',
    link: '/index/sql',
    page: Sql,
  },
};
