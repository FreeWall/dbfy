import { useEffect, useRef, useState } from 'react';
import Item from './list/item';
import { useNameTooltip } from './list/nameTooltip';

export interface ListItem {
  name: string;
  link: string;
}

export interface ListProps {
  items: ListItem[];
  icon: React.ElementType;
  currentItem?: string;
  loadingItem?: string;
}

export default function List(props: ListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loadingItem, setLoadingItem] = useState<string>();
  const { NameTooltip, onMouseEnter, onMouseLeave } = useNameTooltip(scrollContainerRef.current?.scrollTop);

  function onClickItem(item: ListItem) {
    setLoadingItem(item.name);
    //TODO: current item loading
  }

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setLoadingItem(undefined);
  }, [props.currentItem]);

  //TODO: scroll to current table

  return (
    <>
      <div
        className="max-h-full overflow-y-auto break-all pb-8 text-xs font-medium leading-[1.9em]"
        ref={scrollContainerRef}
      >
        {hydrated &&
          props.items.map((item, idx) => (
            <Item
              key={idx}
              name={item.name}
              link={item.link}
              icon={props.icon}
              isCurrent={props.currentItem == item.name}
              isLoading={loadingItem == item.name}
              onClickItem={() => onClickItem(item)}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          ))}
      </div>

      <NameTooltip />
    </>
  );
}
