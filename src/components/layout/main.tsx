import { ReactElement } from 'react';

export default function Main({ children }: { children: ReactElement }) {
  return <main className="container overflow-y-scroll">{children}</main>;
}
