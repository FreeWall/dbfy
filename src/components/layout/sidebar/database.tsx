import TableIcon from '@/components/icons/table.svg';
import { useDatabase, useTable, useTables } from '@/contexts/app';
import { memo } from 'react';
import List, { ListItem } from './list';
const MemoTableIcon = memo(TableIcon);

export default function Database() {
  const database = useDatabase();
  const tables = useTables();
  const table = useTable();

  const items: ListItem[] = [];

  for (const table of tables) {
    items.push({
      name: table,
      link: '/database/' + database + '/table/' + table,
    });
  }

  return (
    <>
      <div className="p-[20px] pt-0">
        <select className="w-full">
          <option>realcraft</option>
        </select>
      </div>
      <List
        items={items}
        icon={MemoTableIcon}
        currentItem={table}
      />
    </>
  );
}
