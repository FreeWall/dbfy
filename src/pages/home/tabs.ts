import { TabsProps } from '@/components/ui/tabs';
import { memo } from 'react';
import TableIcon from './../../components/icons/table.svg';
import Databases from './tabs/databases';
import Privileges from './tabs/privileges';
import Sql from './tabs/sql';
import { HomeProps } from './[tab].page';
const MemoTableIcon = memo(TableIcon);

export const tabs: TabsProps<HomeProps>['tabs'] = {
  databases: {
    name: 'Databases',
    link: '/home/databases',
    icon: MemoTableIcon,
    component: Databases,
    type: 'left',
  },
  privileges: {
    name: 'Privileges',
    link: '/home/privileges',
    icon: MemoTableIcon,
    component: Privileges,
    type: 'left',
  },
  sql: {
    name: 'SQL',
    link: '/home/sql',
    component: Sql,
    type: 'right',
  },
};
