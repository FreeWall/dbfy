import { DatabaseContext } from '@/pages/database/[id].page';
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
      <div className="p-[20px]">
        <select className="w-full">
          <option>realcraft</option>
        </select>
        <div className="sdfgdfg">
          <div className="w-0"></div>
        </div>
      </div>
      <List items={items} />
    </>
  );
}
