import { TabComponent } from '@/components/ui/tabs';
import { useDatabases } from '@/contexts/app';
import { getSessionStore } from '@/server/session/store';

interface DatabasesProps {
  databases: string[];
}

const Databases: TabComponent<DatabasesProps> = (props) => {
  const databases = useDatabases();

  return (
    <div className="mt-5">
      <div>
        {databases.map((database, idx) => (
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
    databases: [],
  };
};

export default Databases;
