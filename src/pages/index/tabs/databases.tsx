import { HomeProps } from '@/pages/index.page';

export default function Databases(props: HomeProps) {
  return (
    <div>
      {props.databases.map((database, idx) => (
        <div key={idx}>{database}</div>
      ))}
    </div>
  );
}
