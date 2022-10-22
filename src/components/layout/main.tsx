import { ReactElement } from 'react';

export default function Center({ children }: { children: ReactElement }) {
  return <main className="container overflow-y-scroll">{children}</main>;
}
