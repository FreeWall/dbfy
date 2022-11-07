import { useRef, useState } from 'react';
import { useTableNameTooltip } from './tables/nameTooltip';
import Table from './tables/table';

interface TablesProps {
  tables: string[];
  currentTable?: string;
}

export default function Tables(props: TablesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loadingTable, setLoadingTable] = useState<string>();
  const { TableNameTooltip, onMouseEnter, onMouseLeave } = useTableNameTooltip(scrollContainerRef.current?.scrollTop);

  function onClickTable(table: string) {
    console.log('onClickTable', table);
  }

  //TODO: scroll to current table

  return (
    <>
      <div
        className="max-h-full overflow-y-auto break-all pb-8 text-xs font-medium leading-[1.9em]"
        ref={scrollContainerRef}
      >
        {props.tables.map((table) => (
          <Table
            key={table}
            name={table}
            isCurrent={props.currentTable == table}
            isLoading={loadingTable == table}
            onClickTable={onClickTable}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      <TableNameTooltip />
    </>
  );
}
