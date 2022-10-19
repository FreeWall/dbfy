import { ReactElement } from 'react';

export default function Center({ children }: { children: ReactElement }) {
  return <main className="flex-grow">{children}</main>;
}
