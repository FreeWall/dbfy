import { ForwardedRef, forwardRef, ReactElement, useId } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  children?: ReactElement;
}

export default forwardRef(function Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) {
  const id = useId();

  return (
    <>
      <input
        id={id}
        ref={ref}
        type="checkbox"
        disabled={props.disabled}
        checked={props.checked}
        className="h-4 w-4 border border-dbfy-border align-middle outline-none"
      />
      {props.children && <label htmlFor={id}>{props.children}</label>}
    </>
  );
});
