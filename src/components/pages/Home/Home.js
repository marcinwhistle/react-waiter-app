import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import Table from '../../features/Table/Table';

const Home = () => {
  const tablesData = useSelector(getAllTables);

  return (
    <div>
      <h1 className='mb-5'>All tables</h1>
      {tablesData.map((table, index) => (
        <Table key={index} id={table.id} status={table.status}></Table>
      ))}
    </div>
  );
};

export default Home;
