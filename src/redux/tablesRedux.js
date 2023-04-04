import { API_URL } from '../config';
// selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, id) => {
  return tables.find((table) => table.id === id);
};
//actions
const createActionName = (actionName) => `app/tables.${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
//action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
  };
};

export const editTableRequest = (editData) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editData.id,
        status: editData.status,
        peopleAmount: editData.peopleAmount,
        maxPeopleAmount: editData.maxPeopleAmount,
        bill: editData.bill,
      }),
    };
    fetch(API_URL + editData.id, options).then(() =>
      dispatch(editTable(editData))
    );
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return [
        statePart.map((table) => (table.id === action.id ? action : table)),
      ];
    default:
      return statePart;
  }
};
export default tablesReducer;
