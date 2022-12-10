import Tabs, { TabsProps } from '@/components/ui/tabs';
import { ReactElement } from 'react';
import Breadcrumbs, { BreadcrumbsProps } from './page/breadcrumbs';

interface PageProps {
  breadcrumbs: BreadcrumbsProps['breadcrumbs'];
  tabs: {
    currentTab: string;
    tabs: TabsProps['tabs'];
  };
  children: ReactElement;
}

export default function Page(props: PageProps) {
  return (
    <div className="px-6">
      <div>
        <Breadcrumbs breadcrumbs={props.breadcrumbs} />
      </div>
      <div className="pt-5">
        <Tabs
          currentTab={props.tabs.currentTab}
          tabs={props.tabs.tabs}
          onTabClick={(tab) => {
            console.log('onTabClick', tab);
          }}
        />
        {props.children}
      </div>
    </div>
  );
}
