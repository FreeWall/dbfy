import classNames from 'classnames';
import Link from 'next/link';
import { memo, MouseEvent } from 'react';
import TableIcon from './../../../icons/table.svg';
const MemoTableIcon = memo(TableIcon);

interface TableProps {
  name: string;
  isCurrent: boolean;
  isLoading: boolean;
  onClickTable: (name: string) => void;
  onMouseEnter: (event: MouseEvent<HTMLDivElement>, name: string) => void;
  onMouseLeave: () => void;
}

export default function Table(props: TableProps) {
  return (
    <Link href={'/table/' + props.name}>
      <div
        key={props.name}
        className={classNames('flex cursor-pointer items-center whitespace-nowrap pl-5 pr-2 hover:bg-dbfy-border', {
          'bg-dbfy-border font-semibold': props.isCurrent,
        })}
        onClick={() => props.onClickTable(props.name)}
        onMouseLeave={() => props.onMouseLeave()}
      >
        <div className="mr-2 flex h-4 w-4 flex-shrink-0 items-center fill-dbfy-dark-icon">
          {(props.isLoading && <div className="border-spinner h-4 w-4 border-[3px]" />) || <MemoTableIcon />}
        </div>
        <div
          className="overflow-hidden overflow-ellipsis"
          onMouseEnter={(event) => props.onMouseEnter(event, props.name)}
        >
          {props.name}
        </div>
      </div>
    </Link>
  );
}