import classNames from 'classnames';
import { useRef, useState } from 'react';
import TableIcon from '../../icons/table.svg';
import { useTableNameTooltip } from './tables/nameTooltip';

interface TablesProps {
  tables: string[];
  currentTable?: string;
}

export default function Tables(props: TablesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loadingTable, setLoadingTable] = useState<string>();
  const { TableNameTooltip, onMouseEnter, onMouseLeave } = useTableNameTooltip(ref.current?.scrollTop);

  function onClickTable(table: string) {
    console.log('onClickTable', table);
  }

  //TODO: scroll to current table

  return (
    <>
      <div
        className="max-h-full overflow-y-auto break-all pb-8 text-xs font-medium leading-[1.9em]"
        ref={ref}
      >
        {props.tables.map((table) => (
          <div
            key={table}
            className={classNames('flex cursor-pointer items-center whitespace-nowrap pl-5 pr-2 hover:bg-dbfy-border', {
              'bg-dbfy-border font-semibold': props.currentTable == table,
            })}
            onClick={() => onClickTable(table)}
          >
            <div className="mr-2 inline-block h-4 w-4 flex-shrink-0 fill-dbfy-dark-icon align-middle">
              {(loadingTable == table && <div className="border-spinner h-4 w-4 border-[3px]" />) || <TableIcon />}
            </div>
            <div
              className="overflow-hidden overflow-ellipsis"
              onMouseEnter={(event) => onMouseEnter(event, table)}
              onMouseLeave={() => onMouseLeave()}
            >
              {table}
            </div>
          </div>
        ))}
      </div>

      <TableNameTooltip />
    </>
  );
}
