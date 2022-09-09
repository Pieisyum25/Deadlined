import { createSlice } from "@reduxjs/toolkit";


export const tempTaskSlice = createSlice({
    name: 'tempTask',
    initialState: {},
    reducers: {
        initTask: (state) => {
            return {
                name: "",
                reward: "",
                colour: "",
                startDate: "",
                endDate: "",
                subtasks: [],
            };
        },

        addSubtask: (state, action) => { state.subtasks.push(action.payload.subtask); },
        editSubtask: (state, action) => { state.subtasks[action.payload.subtaskIndex] = action.payload.subtask; },
        removeSubtask: (state, action) => { state.subtasks.splice(action.payload.subtaskIndex, 1); },
    }
});

export default tempTaskSlice.reducer;
export const { initTask, addSubtask, editSubtask, removeSubtask } = tempTaskSlice.actions;

export const selectTask = state => state.tempTask;
export const selectSubtask = action => state => state.tempTask.subtasks[action.payload.subtaskIndex];