//selectors
export const getTableById = (state, tableId) => state.tables.find(table => table.id === tableId);

const createActionName = name => `app/tables/${name}`;

//actions
export const LOAD_TABLES = createActionName('LOAD_TABLES');
export const MODIFY_TABLE = createActionName('MODIFY_TABLE');

//action creators
export const loadTables = payload => ({ type: LOAD_TABLES, payload });
export const modifyTable = payload => ({ type: MODIFY_TABLE, payload });

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