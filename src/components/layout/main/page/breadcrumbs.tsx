import Link from 'next/link';
import { memo, ReactElement } from 'react';
import AngleDoubleRightIcon from './../../../icons/angle_double_right.svg';
const MemoAngleDoubleRightIcon = memo(AngleDoubleRightIcon);

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
          className="mr-[10px] flex items-center"
        >
          <Link
            href={breadcrumb.link}
            className="inline cursor-pointer py-[2px] text-sm hover:text-dbfy-link hover:underline"
          >
            <a>{breadcrumb.name}</a>
          </Link>
          {idx < props.breadcrumbs.length - 1 && (
            <div className="ml-[10px] py-[2px]">
              <div className="h-[9px] w-[9px] fill-dbfy-dark-icon">
                <MemoAngleDoubleRightIcon />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
