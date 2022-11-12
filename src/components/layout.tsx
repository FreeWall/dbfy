import { ReactElement } from 'react';

import Main from './layout/main';
import Sidebar from './layout/sidebar';

export default function Layout({ noSidebar, children }: { noSidebar?: boolean; children: ReactElement }) {
  return (
    <div className="flex h-full">
      {!noSidebar && <Sidebar />}
      <Main>{children}</Main>
    </div>
  );
}
