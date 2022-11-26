import { ReactElement } from 'react';

import Main from './layout/main';
import Sidebar from './layout/sidebar';

interface LayoutProps {
  sidebar?: boolean;
  children: ReactElement;
}

export default function Layout(props: LayoutProps) {
  const sidebar = typeof props.sidebar === 'undefined' ? true : props.sidebar;

  return (
    <div className="flex h-full">
      {sidebar && <Sidebar />}
      <Main>{props.children}</Main>
    </div>
  );
}
