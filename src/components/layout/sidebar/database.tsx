import { DatabaseContext } from '@/pages/database/[database]/[tab].page';
import { useContext } from 'react';
import List, { ListItem } from './list';

export default function Database() {
  const databaseContext = useContext(DatabaseContext);

  const items: ListItem[] = [];

  for (const table of databaseContext.tables) {
    items.push({
      name: table,
      link: '/table/' + table,
    });
  }

  return (
    <>
      <div className="p-[20px] pt-0">
        <select className="w-full">
          <option>realcraft</option>
        </select>
      </div>
      <List items={items} />
    </>
  );
}
