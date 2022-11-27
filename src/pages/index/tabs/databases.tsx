import { TabComponent } from '@/components/ui/tabs';
import { useDatabases } from '@/contexts/app';
import { getSessionStore } from '@/server/session/store';
import { useEffect, useState } from 'react';

interface DatabasesProps {
  databases: string[];
}

const Databases: TabComponent<DatabasesProps> = (props) => {
  const databases = useDatabases();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="mt-5">
      <div>{hydrated && databases.map((database, idx) => <div key={idx}>{database}</div>)}</div>
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
