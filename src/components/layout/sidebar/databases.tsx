import DatabaseIcon from '@/components/icons/database.svg';
import { useDatabases } from '@/contexts/app';
import { memo } from 'react';
import List, { ListItem } from './list';
const MemoDatabaseIcon = memo(DatabaseIcon);

export const Databases = () => {
  const databases = useDatabases();
  const items: ListItem[] = [];

  for (const database of databases) {
    items.push({
      name: database,
      link: '/database/' + database,
    });
  }

  return (
    <List
      items={items}
      icon={MemoDatabaseIcon}
    />
  );
};
