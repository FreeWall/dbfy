import DropdownMenu from './header/dropdownMenu';
import EnvLabel, { EnvLabelProps } from './header/envLabel';

interface HeaderProps {
  envLabel?: EnvLabelProps;
}

export default function Header(props: HeaderProps) {
  return (
    <header>
      {props.envLabel && <EnvLabel {...props.envLabel} />}
      <div className="flex items-center justify-between p-[20px] text-3xl font-bold leading-none text-dbfy-light-icon">
        <div>dbfy</div>
        <DropdownMenu />
      </div>
    </header>
  );
}
