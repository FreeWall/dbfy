import { QueryError } from './error';

const ErrorsTooltip = (props: { errors: QueryError[] }) => {
  return (
    <div className="absolute z-10 hidden select-text rounded-[3px] border border-dbfy-border bg-dbfy-input px-2 py-[6px] text-[#cc0000] group-hover:block">
      {props.errors.length} errors
    </div>
  );
};

const LineGutter = (props: { number: number; errors?: QueryError[] }) => {
  return (
    <div className={'group relative w-full pl-[10px] pr-2 ' + (props.errors ? 'bg-[#cc0000] text-[#fff]' : '')}>
      {props.number < 10 && <span>&nbsp;</span>}
      {props.number}
      {props.errors && (
        <>
          <div className="absolute top-0 left-[-1px] h-full w-[1px] border-r border-r-[#cc0000]"></div>
          <div className="absolute top-0 right-[-1px] h-full w-[1px] border-r border-r-[#cc0000]"></div>
        </>
      )}
      {props.errors && <ErrorsTooltip errors={props.errors} />}
    </div>
  );
};

export default function Gutters(props: { lines: number; errors: QueryError[] }) {
  return (
    <>
      {[...Array(props.lines)].map((el, i) => {
        const line = i + 1;
        const errors: QueryError[] = props.errors.filter((error) => error.line == line);

        return (
          <LineGutter
            number={line}
            errors={errors.length > 0 ? errors : undefined}
            key={i}
          />
        );
      })}
    </>
  );
}
