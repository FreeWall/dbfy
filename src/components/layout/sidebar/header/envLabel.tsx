import classNames from 'classnames';

export interface EnvLabelProps {
  title: string;
  subtitle?: string;
  color: 'red' | 'blue';
}

export default function EnvLabel(props: EnvLabelProps) {
  return (
    <div
      className={classNames('p-4 px-[20px] text-xl font-semibold text-[#ffffff]', {
        'bg-[#b14f4f]': props.color == 'red',
        'bg-[#4f71b1]': props.color == 'blue',
      })}
    >
      {props.title}
      {props.subtitle && <div className="text-sm">{props.subtitle}</div>}
    </div>
  );
}
