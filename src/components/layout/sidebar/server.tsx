import classNames from 'classnames';

interface ServerProps {
  status: 'online' | 'offline';
  server: string;
}

export default function Server(props: ServerProps) {
  return (
    <div className="px-[20px]">
      <div className="text-[11px] font-medium">Server</div>
      <div className="flex items-center">
        <div
          className={classNames('mr-2 h-[9px] w-[9px] min-w-[9px] rounded-full bg-dbfy-text', {
            'bg-[#78b14f]': props.status == 'online',
            'bg-[#b14f4f]': props.status == 'offline',
          })}
        />
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold">{props.server}</div>
      </div>
    </div>
  );
}
