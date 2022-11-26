import { ReactElement } from 'react';

import Main from './layout/main';
import Sidebar, { SidebarProps } from './layout/sidebar';

interface LayoutProps {
  sidebar?: false | SidebarProps['type'];
  children: ReactElement;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex h-full">
      {props.sidebar && <Sidebar type={props.sidebar} />}
      <Main>{props.children}</Main>
    </div>
  );
}
