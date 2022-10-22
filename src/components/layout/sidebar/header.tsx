import classNames from 'classnames';

interface HeaderProps {
  envLabel?: {
    title: string;
    subtitle?: string;
    color: 'red' | 'blue';
  };
}

export default function Header(props: HeaderProps) {
  return (
    <header>
      {props.envLabel && (
        <div
          className={classNames('p-4 px-[20px] text-xl font-semibold text-[#ffffff]', {
            'bg-[#b14f4f]': props.envLabel.color == 'red',
            'bg-[#4f71b1]': props.envLabel.color == 'blue',
          })}
        >
          {props.envLabel.title}
          {props.envLabel.subtitle && <div className="text-sm">{props.envLabel.subtitle}</div>}
        </div>
      )}
      <div className="p-[20px] text-3xl font-bold leading-none text-dbfy-light-icon">
        <div>dbfy</div>
      </div>
    </header>
  );
}

/*<DropdownMenu.Root>
        <DropdownMenu.Trigger>test</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>bagr</DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>*/
