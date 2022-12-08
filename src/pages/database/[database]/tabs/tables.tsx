import { TabComponent } from '@/components/ui/tabs';
import { getSessionStore } from '@/server/session/store';
import { useContext, useEffect, useState } from 'react';
import { DatabaseContext } from '../[tab].page';

interface TablesProps {
  databases: string[];
}

const Tables: TabComponent<TablesProps> = (props) => {
  const databaseContext = useContext(DatabaseContext);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="mt-5">
      <div>{hydrated && databaseContext.tables.map((table, idx) => <div key={idx}>{table}</div>)}</div>
    </div>
  );
};

Tables.getServerSideProps = async ({ req }) => {
  const sequelize = getSessionStore(req.session).sequelize;

  if (!sequelize) {
    return;
  }

  return {
    databases: [],
  };
};

export default Tables;
