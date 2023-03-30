import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTableById } from '../../../redux/tablesRedux';
import EditTableForm from '../EditTableForm/EditTableForm.js';
import { Navigate } from 'react-router-dom';

const SingleTable = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));

  if (!tableData) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <EditTableForm
        id={tableData.id}
        status={tableData.status}
        peopleAmount={tableData.peopleAmount}
        maxPeopleAmount={tableData.maxPeopleAmount}
        bill={tableData.bill}
      />
    </div>
  );
};

export default SingleTable;
