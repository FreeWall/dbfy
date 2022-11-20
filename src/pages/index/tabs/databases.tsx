import { TabPage } from '@/components/ui/tabs';
import { getSessionStore } from '@/server/session/store';

interface DatabasesProps {
  databases: string[];
}

const Databases: TabPage = (props: DatabasesProps) => {
  return (
    <div className="mt-5">
      <div>
        {props.databases.map((database, idx) => (
          <div key={idx}>{database}</div>
        ))}
      </div>
    </div>
  );
};

Databases.getServerSideProps = async ({ req }) => {
  const sequelize = getSessionStore(req.session).sequelize;

  if (!sequelize) {
    return;
  }

  return {
    databases: await sequelize.getDatabases(),
  };
};

export default Databases;
