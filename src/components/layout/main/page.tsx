import Tabs, { TabsProps } from '@/components/ui/tabs';
import Breadcrumbs, { BreadcrumbsProps } from './page/breadcrumbs';

interface PageProps<T> {
  pageProps: T;
  breadcrumbs: BreadcrumbsProps['breadcrumbs'];
  tabs: {
    currentTab: string;
    tabs: TabsProps<T>['tabs'];
  };
}

export default function Page<T>(props: PageProps<T>) {
  return (
    <div className="px-6">
      <div>
        <Breadcrumbs breadcrumbs={props.breadcrumbs} />
      </div>
      <div className="pt-5">
        <Tabs
          pageProps={props.pageProps}
          currentTab={props.tabs.currentTab}
          tabs={props.tabs.tabs}
          onTabClick={(tab) => {
            console.log('onTabClick', tab);
          }}
        />
      </div>
    </div>
  );
}
