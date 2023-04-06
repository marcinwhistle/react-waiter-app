import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import Table from '../../features/Table/Table';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTables } from '../../../redux/tablesRedux';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);
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
