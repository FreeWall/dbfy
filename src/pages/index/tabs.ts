import { Tab } from '@/components/ui/tabs';
import { memo } from 'react';
import TableIcon from './../../components/icons/table.svg';
const MemoTableIcon = memo(TableIcon);

export const leftTabs: Tab[] = [
  {
    id: 'databases',
    name: 'Databases',
    icon: MemoTableIcon,
  },
  {
    id: 'privileges',
    name: 'Privileges',
  },
  {
    id: 'export',
    name: 'Export',
  },
  {
    id: 'import',
    name: 'Import',
  },
];

export const rightTabs: Tab[] = [
  {
    id: 'sql',
    name: 'SQL',
  },
];
