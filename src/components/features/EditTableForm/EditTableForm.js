import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';

const EditTableForm = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));

  if (!tableData) {
    return <Navigate to='/' />;
  }
  return (
    <div>
      <h1>Table {tableData.id}</h1>
      <h1>Status {tableData.status}</h1>
      <h1>
        People {tableData.peopleAmount} / {tableData.maxPeopleAmount}
      </h1>
      <h1>Bill {tableData.bill} $</h1>
    </div>
  );
};

export default EditTableForm;
