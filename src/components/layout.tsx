import { ReactElement } from 'react';

import Main from './layout/main';
import Sidebar from './layout/sidebar';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
}
