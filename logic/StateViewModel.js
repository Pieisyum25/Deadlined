import { createSlice } from "@reduxjs/toolkit";
import { getCurrentSubtask, getCurrentSubtasks } from "./util";

// State ViewModel, allowing indirect interactions with the Redux store related to task data:


// Creates a slice in the store for holding and managing task data:
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        initTasks: (state, action) => action.payload.tasks,

        addTask: (state, action) => { state.push(action.payload.task); },
        updateTask: (state, action) => { state[action.payload.taskIndex] = action.payload.task; },
        removeTask: (state, action) => { state.splice(action.payload.taskIndex, 1); },

        addSubtask: (state, action) => { state[action.payload.taskIndex].subtasks.push(action.payload.subtask); },
        updateSubtask: (state, action) => { state[action.payload.taskIndex].subtasks[action.payload.subtaskIndex] = action.payload.subtask; },
        removeSubtask: (state, action) => { state[action.payload.taskIndex].subtasks.splice(action.payload.subtaskIndex, 1); },
    }
});

// Export the main reducer and actions for updating the task data:
export const tasksReducer = tasksSlice.reducer;
export const { initTasks, addTask, updateTask, removeTask, addSubtask, updateSubtask, removeSubtask } = tasksSlice.actions;

// Export selectors for accessing various properties of the task data:
export const selectTasks = state => state.tasks;
export const selectTask = payload => state => state.tasks[payload.taskIndex];
export const selectTaskSubtasks = payload => state => state.tasks[payload.taskIndex].subtasks;
export const selectTaskSubtask = payload => state => state.tasks[payload.taskIndex].subtasks[payload.subtaskIndex];
export const selectCurrentSubtasks = state => getCurrentSubtasks(state.tasks);
export const selectCurrentSubtask = payload => state => getCurrentSubtask(state.tasks[payload.taskIndex]);