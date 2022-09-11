import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { updateDatabase } from "../logic/DatabaseViewModel";
import { tasksReducer } from "../logic/StateViewModel";


const dbDispatcher = store => next => action => {
    const result = next(action);
    updateDatabase();
    return result;
}

export default configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dbDispatcher),
});

