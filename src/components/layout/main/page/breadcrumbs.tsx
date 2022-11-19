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
    <div className="flex pt-4">
      {props.breadcrumbs.map((breadcrumb, idx) => (
        <div
          key={idx}
          className="mr-2 flex"
        >
          <Link href={breadcrumb.link}>
            <a className="inline cursor-pointer py-[2px] hover:text-dbfy-link-color hover:underline">
              {breadcrumb.name}
            </a>
          </Link>
          {idx < props.breadcrumbs.length - 1 && <div className="ml-2 py-[2px]">{'>'}</div>}
        </div>
      ))}
    </div>
  );
}
