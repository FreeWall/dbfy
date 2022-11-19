import Tabs, { Tab } from '@/components/ui/tabs';
import { ReactElement } from 'react';
import Breadcrumbs, { BreadcrumbsProps } from './page/breadcrumbs';

interface PageProps {
  breadcrumbs: BreadcrumbsProps['breadcrumbs'];
  tabs: {
    currentTab: string;
    leftTabs: Tab[];
    rightTabs?: Tab[];
  };
  children: ReactElement;
}

export default function Page(props: PageProps) {
  return (
    <div className="px-6 py-5">
      <div>
        <Breadcrumbs breadcrumbs={props.breadcrumbs} />
      </div>
      <div className="pt-5">
        <Tabs
          currentTab={props.tabs.currentTab}
          leftTabs={props.tabs.leftTabs}
          rightTabs={props.tabs.rightTabs}
          onTabClick={(tab) => {
            console.log('onTabClick', tab);
          }}
        />
      </div>
    </div>
  );
}
