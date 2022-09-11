import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { updateDatabase } from "../logic/DatabaseViewModel";
import { tasksReducer } from "../logic/StateViewModel";

// Redux Model, for handling local data and changes to state:


// Middleware to update the database whenever the store's state is changed:
const dbDispatcher = store => next => action => {
    const result = next(action);
    updateDatabase();
    return result;
}

// A Redux store used for handling the user's task data:
export default configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dbDispatcher),
});

