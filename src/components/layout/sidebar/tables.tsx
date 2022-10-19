import classNames from 'classnames';
import { useEffect, useState } from 'react';
import TableIcon from '../../icons/table.svg';

interface TablesProps {
  tables: string[];
  currentTable?: string;
}

export default function Tables(props: TablesProps) {
  const [loadingTable, setLoadingTable] = useState<string>();

  useEffect(() => {
    setLoadingTable('news');
  }, []);

  function onClickTable(table: string) {
    console.log('onClickTable', table);
  }

  return (
    <div className="max-h-full overflow-y-auto break-all text-xs font-medium leading-[1.9em]">
      {props.tables.map((table) => (
        <div
          key={table}
          className={classNames('cursor-pointer px-[20px] hover:bg-dbfy-border', {
            'bg-dbfy-border font-semibold': props.currentTable == table,
          })}
          onClick={() => onClickTable(table)}
        >
          <div className="mr-2 inline-block w-4 fill-dbfy-dark-icon align-middle">
            {(loadingTable == table && <div className="border-spinner h-4 w-4 border-[3px]" />) || <TableIcon />}
          </div>
          <div className="inline-block align-middle">{table}</div>
        </div>
      ))}
    </div>
  );
}
