import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Header() {
  return (
    <header className="p-[20px]">
      <div className="text-3xl font-bold leading-none text-dbfy-light-icon">dbfy</div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>test</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>bagr</DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
