import classNames from 'classnames';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export type TabComponent = React.ElementType & {
  getServerSideProps?: (context: GetServerSidePropsContext) => Promise<{ [key: string]: any } | undefined>;
};

export interface Tab {
  name: string;
  type: 'left' | 'right';
  icon?: React.ElementType;
  link?: string;
  component?: TabComponent;
}

export interface TabsProps<T> {
  pageProps: T;
  currentTab: string;
  tabs: { [key: string]: Tab };
  onTabClick: (key: string) => void;
}

function TabButton(props: Tab & { key: string; current: boolean; onClick: () => void }) {
  const getElement = props.link
    ? (tab: ReactElement) => <Link href={props.link as string}>{tab}</Link>
    : (tab: ReactElement) => tab;

  return getElement(
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
    </div>,
  );
}

export default function Tabs<T>(props: TabsProps<T>) {
  const CurrentTabComponent = props.tabs[props.currentTab]?.component;

  const leftTabs = Object.entries(props.tabs).filter(([, tab]) => tab.type == 'left');
  const rightTabs = Object.entries(props.tabs).filter(([, tab]) => tab.type == 'right');

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            {leftTabs.map(([key, tab]) => (
              <TabButton
                key={key}
                current={props.currentTab == key}
                onClick={() => props.onTabClick(key)}
                {...tab}
              />
            ))}
          </div>
          {rightTabs.length && (
            <div className="flex">
              {rightTabs.map(([key, tab]) => (
                <TabButton
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
