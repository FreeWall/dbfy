import classNames from 'classnames';
import React from 'react';

export interface Tab<T> {
  name: string;
  icon?: React.ElementType;
  component?: React.ElementType<T>;
}

export interface TabsProps<T> {
  pageProps: T;
  currentTab?: string;
  leftTabs: { [key: string]: Tab<T> };
  rightTabs?: { [key: string]: Tab<T> };
  onTabClick: (key: string) => void;
}

function Tab<T>(props: Tab<T> & { key: string; current: boolean; onClick: () => void }) {
  return (
    <div
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

export default function Tabs<T>(props: TabsProps<T>) {
  const CurrentTabComponent = props.currentTab ? props.leftTabs[props.currentTab]?.component : null;

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            {Object.entries(props.leftTabs).map(([key, tab]) => (
              <Tab
                key={key}
                current={props.currentTab == key}
                onClick={() => props.onTabClick(key)}
                {...tab}
              />
            ))}
          </div>
          {props.rightTabs && (
            <div className="flex">
              {Object.entries(props.rightTabs).map(([key, tab]) => (
                <Tab
                  key={key}
                  current={props.currentTab == key}
                  onClick={() => props.onTabClick(key)}
                  {...tab}
                />
              ))}
            </div>
          )}
        </div>
        <div className="-mt-[1px] border-b border-b-dbfy-border"></div>
      </div>
      <div>{CurrentTabComponent && <CurrentTabComponent {...props.pageProps} />}</div>
    </>
  );
}
