import classNames from 'classnames';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface ItemProps {
  name: string;
  link: string;
  icon: React.ElementType;
  isCurrent: boolean;
  isLoading: boolean;
  onClickItem: () => void;
  onMouseEnter: (event: MouseEvent<HTMLDivElement>, name: string) => void;
  onMouseLeave: () => void;
}

export default function Item(props: ItemProps) {
  return (
    <Link href={props.link}>
      <div
        key={props.name}
        className={classNames('flex cursor-pointer items-center whitespace-nowrap pl-5 pr-2 hover:bg-dbfy-border', {
          'bg-dbfy-border font-semibold': props.isCurrent,
        })}
        onClick={() => props.onClickItem()}
        onMouseLeave={() => props.onMouseLeave()}
      >
        <div className="mr-2 flex h-4 w-4 flex-shrink-0 items-center fill-dbfy-dark-icon">
          {(props.isLoading && <div className="border-spinner h-4 w-4 border-[3px]" />) || <props.icon />}
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
