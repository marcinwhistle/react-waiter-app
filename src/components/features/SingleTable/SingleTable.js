import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTableById } from '../../../redux/tablesRedux';

const SingleTable = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));

  return <div>Single Table {tableData.status}</div>;
};

export default SingleTable;
