import { ForwardedRef, forwardRef } from 'react';

export interface TextInputProps {
  type: 'text' | 'password';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

export default forwardRef(function TextInput(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input
      ref={ref}
      type={props.type}
      disabled={props.disabled}
      className="w-full rounded-[3px] border border-dbfy-border py-[6px] px-2 outline-none focus:border focus:border-dbfy-focus focus:shadow-[0_0_0_1px_theme(colors.dbfy-focus)]"
      {...{ placeholder: props.placeholder, defaultValue: props.value }}
    />
  );
});
