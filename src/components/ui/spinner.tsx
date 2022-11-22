import classNames from 'classnames';

interface SpinnerProps {
  size: 24 | 32;
}

export default function Spinner(props: SpinnerProps) {
  return (
    <div
      className={classNames(
        { 'h-6 w-6 border-[5px]': props.size == 24 },
        { 'h-8 w-8 border-[6px]': props.size == 32 },
        'animate-spin rounded-full border-dbfy-border border-t-dbfy-dark-icon',
      )}
    ></div>
  );
}
