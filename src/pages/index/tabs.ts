import { TabsProps } from '@/components/ui/tabs';
import { memo } from 'react';
import { HomeProps } from '../index.page';
import TableIcon from './../../components/icons/table.svg';
import Databases from './tabs/databases';
import Privileges from './tabs/privileges';
const MemoTableIcon = memo(TableIcon);

export const leftTabs: TabsProps<HomeProps>['leftTabs'] = {
  databases: {
    name: 'Databases',
    icon: MemoTableIcon,
    component: Databases,
  },
  privileges: {
    name: 'Privileges',
    component: Privileges,
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
  },
};
