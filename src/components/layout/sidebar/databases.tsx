import { useDatabases } from '@/contexts/app';
import List, { ListItem } from './list';

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
    <div className="pt-[20px]">
      <List items={items} />
    </div>
  );
};
