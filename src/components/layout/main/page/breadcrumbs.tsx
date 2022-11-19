import Link from 'next/link';
import { ReactElement } from 'react';

export interface BreadcrumbsProps {
  breadcrumbs: {
    name: string | ReactElement;
    link: string;
  }[];
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <div className="flex">
      {props.breadcrumbs.map((breadcrumb, idx) => (
        <div
          key={idx}
          className="mr-2 flex"
        >
          <Link href={breadcrumb.link}>
            <div>{breadcrumb.name}</div>
          </Link>
          {idx < props.breadcrumbs.length - 1 && <div className="ml-2">{'>'}</div>}
        </div>
      ))}
    </div>
  );
}
