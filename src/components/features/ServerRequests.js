import { loadTables, modifyTable } from "../../redux/tablesRedux";
import { API_URL } from "../../config";

export const fetchTablesRequest = () => {
    return dispatch => {
        fetch(`${API_URL}/tables`)
        .then(response => response.json())
        .then(data => dispatch(loadTables(data)))
        .then(() => console.log("Data loaded successfully"))
    };
};

export const modifyTableRequest = (id, updatedData) => {
    return dispatch => {
        fetch(`${API_URL}/tables/${id}`, {
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