import TableIcon from '@/components/icons/table.svg';
import { useTables } from '@/contexts/app';
import { memo } from 'react';
import List, { ListItem } from './list';
const MemoTableIcon = memo(TableIcon);

export default function Database() {
  const tables = useTables();
  const items: ListItem[] = [];

  for (const table of tables) {
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
      <List
        items={items}
        icon={MemoTableIcon}
      />
    </>
  );
}
