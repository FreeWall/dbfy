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
      placeholder={props.placeholder}
      defaultValue={props.value}
      className="w-full rounded-[3px] border border-dbfy-border py-[6px] px-2 outline-none ring-dbfy-focus focus:border focus:border-dbfy-focus focus:ring-1"
    />
  );
});
