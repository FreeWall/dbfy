import classNames from 'classnames';

export interface Tab {
  id: string;
  name: string;
  icon?: React.ElementType;
}

export interface TabsProps {
  currentTab?: string;
  leftTabs: Tab[];
  rightTabs?: Tab[];
  onTabClick: (tab: Tab) => void;
}

function Tab(props: Tab & { current: boolean; onClick: () => void }) {
  return (
    <div
      key={props.id}
      className={classNames(
        'relative flex cursor-pointer items-center border border-l-0 border-dbfy-border bg-dbfy-input px-3 py-2 font-semibold first:border-l',
        {
          'border-b-0 bg-white': props.current,
          'hover:bg-dbfy-input-hover': !props.current,
        },
      )}
      onClick={() => props.onClick()}
    >
      {props.current && (
        <div className="absolute top-0 left-0 -mt-[4px] -ml-[1px] w-[calc(100%+2px)] border-b-4 border-b-dbfy-dark-icon"></div>
      )}
      {props.icon && (
        <div className="mr-2 flex h-3 w-3 flex-shrink-0 items-center fill-dbfy-dark-icon">
          <props.icon />
        </div>
      )}
      <div>{props.name}</div>
    </div>
  );
}

export default function Tabs(props: TabsProps) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          {props.leftTabs.map((tab) => (
            <Tab
              key={tab.id}
              current={props.currentTab == tab.id}
              onClick={() => props.onTabClick(tab)}
              {...tab}
            />
          ))}
        </div>
        {props.rightTabs && (
          <div className="flex">
            {props.rightTabs.map((tab) => (
              <Tab
                key={tab.id}
                current={props.currentTab == tab.id}
                {...tab}
                onClick={() => props.onTabClick(tab)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="-mt-[1px] border-b border-b-dbfy-border"></div>
    </div>
  );
}
