import { ForwardedRef, forwardRef } from 'react';

export interface TextInputProps {
  type: 'text' | 'password';
  placeholder?: string;
}

export default forwardRef(function TextInput(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input
      ref={ref}
      type={props.type}
      className="w-full rounded-[3px] border border-dbfy-border py-[6px] px-2"
      {...{ placeholder: props.placeholder }}
    />
  );
});
