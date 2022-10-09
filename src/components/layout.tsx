import { ReactElement } from 'react';

import Center from './layout/center';
import Sidebar from './layout/sidebar';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="flex">
      <Sidebar />
      <Center>{children}</Center>
    </div>
  );
}
