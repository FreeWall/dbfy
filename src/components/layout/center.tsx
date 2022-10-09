import { ReactElement } from 'react';

export default function Center({ children }: { children: ReactElement }) {
  return <main className="bg-slate-200 flex-grow">{children}</main>;
}
