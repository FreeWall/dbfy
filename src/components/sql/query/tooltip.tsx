export default function Tooltip(props: { text?: string; loading?: boolean }) {
  return (
    <div className="pointer-events-none absolute top-2 right-[9px] text-xs font-medium text-dbfy-light-icon">
      <div className="inline-block align-middle">{props.text}</div>

      {props.loading && <div className="border-spinner ml-2 h-4 w-4 border-[3px]"></div>}
    </div>
  );
}
