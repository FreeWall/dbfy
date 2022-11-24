import classNames from 'classnames';

interface ButtonProps {
  text: string;
  loading?: boolean;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <div
      className={classNames('relative select-none rounded-[3px] bg-dbfy-dark-icon py-2 px-4 font-semibold text-white', {
        'cursor-pointer hover:bg-dbfy-text': !props.loading,
      })}
      onClick={() => props.onClick?.()}
    >
      <div className={classNames({ 'opacity-0': props.loading })}>{props.text}</div>
      {props.loading && (
        <div className="absolute left-0 right-0 top-0 bottom-0 m-auto h-6 w-6 animate-spin rounded-full border-[4px] border-dbfy-dark-icon border-t-white" />
      )}
    </div>
  );
}
