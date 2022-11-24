import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import CogIcon from './../../../icons/cog.svg';

export default function DropdownMenu(props: any) {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content>
          <div className="rounded-[3px] border border-dbfy-border bg-dbfy-input px-[9px] py-2 pr-[42px]">
            <RadixDropdownMenu.CheckboxItem checked={true}>
              <RadixDropdownMenu.ItemIndicator>checked</RadixDropdownMenu.ItemIndicator>
              bagr
            </RadixDropdownMenu.CheckboxItem>
          </div>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Trigger>
        <div className="h-9 w-9 cursor-pointer fill-dbfy-light-icon p-2 hover:fill-dbfy-dark-icon">
          <CogIcon />
        </div>
      </RadixDropdownMenu.Trigger>
    </RadixDropdownMenu.Root>
  );
}
