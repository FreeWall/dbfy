import { useRef, useState } from 'react';
import Item from './list/item';
import { useNameTooltip } from './list/nameTooltip';

interface ListProps {
  items: string[];
  currentItem?: string;
}

export default function List(props: ListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loadingItem, setLoadingItem] = useState<string>();
  const { NameTooltip, onMouseEnter, onMouseLeave } = useNameTooltip(scrollContainerRef.current?.scrollTop);

  function onClickItem(item: string) {
    console.log('onClickItem', item);
  }

  //TODO: scroll to current table

  return (
    <>
      <div
        className="max-h-full overflow-y-auto break-all pb-8 text-xs font-medium leading-[1.9em]"
        ref={scrollContainerRef}
      >
        {props.items.map((table) => (
          <Item
            key={table}
            name={table}
            isCurrent={props.currentItem == table}
            isLoading={loadingItem == table}
            onClickItem={onClickItem}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      <NameTooltip />
    </>
  );
}
