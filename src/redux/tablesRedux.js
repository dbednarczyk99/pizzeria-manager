
//selectors
export const getTableById = (state, tableId) => state.tables.find(table => table.id === tableId);

const createActionName = name => `app/tables/${name}`;

//actions
export const LOAD_TABLES = createActionName('LOAD_TABLES');
export const MODIFY_TABLE = createActionName('MODIFY_TABLE');

//action creators
export const loadTables = payload => ({ type: LOAD_TABLES, payload });
export const modifyTable = payload => ({ type: MODIFY_TABLE, payload });
export const fetchTables = () => {
  return dispatch => {
    fetch('http://localhost:3131/tables')
      .then(response => response.json())
      .then(data => dispatch(loadTables(data)))
      .then(() => console.log("Tables loaded successfully"))
    };
  };
export const modifyTableRequest = (id, updatedData) => {
  return dispatch => {
    fetch(`http://localhost:3131/tables/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update table");
        return res.json();
      })
      .then(() => {
        dispatch(modifyTable({ id, ...updatedData }));
      })
      .catch(err => {
        console.error("Update error:", err);
      });
  };
};


const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES: {
      //console.log("Data: ", action.payload);
      return [...action.payload];
    }
    case MODIFY_TABLE: {
      return statePart.map(table => 
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
    }
    default:
      return statePart;
  };
};

export default tablesReducer;