import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";


export const tasksSlice = createSlice({
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

export default tasksSlice.reducer;
export const { initTasks, addTask, updateTask, removeTask, addSubtask, updateSubtask, removeSubtask } = tasksSlice.actions;

export const selectTasks = state => state.tasks;
export const selectTask = action => state => state.tasks[action.payload.taskIndex];
export const selectTaskSubtasks = action => state => state.tasks[action.payload.taskIndex].subtasks;
export const selectSubtask = action => state => state.tasks[action.payload.taskIndex].subtasks[action.payload.subtaskIndex];