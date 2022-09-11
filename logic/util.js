
// Miscellaneous functions used throughout the UI, often used to manipulate the task data in the Redux store:


// Creates a task with the given values or default values:
export function createTask(name, reward, colour, startDate, endDate, subtasks) {
    return {
        name: name || "Task",
        reward: reward || "No Reward",
        colour: colour || "white",
        startDate: startDate || dateToString(new Date()),
        endDate: endDate || dateToString(addDays(new Date(), 1)),
        subtasks: subtasks || [],
    };
}

// Creates a subtask with the given values or default values:
export function createSubtask(name, reward, weight, completed){
    return {
        name: name || "Subtask",
        reward: reward || "No reward",
        weight: weight || 1.0,
        completed: completed || false,
    }
}

// Creates a prompt describing the keyDate's relation to the current date:
export function getDatePrompt(keyDateString) {
    const keyDate = stringToDate(keyDateString);
    const currDate = new Date();
    let daysApart = getDaysApart(currDate, keyDate);

    if (daysApart == 0) {
        return "Today";
    }

    const passed = (daysApart < 0);
    daysApart = Math.abs(daysApart);
    const days = (daysApart == 1) ? "Day" : "Days";

    if (passed) return daysApart + " " + days + " Ago"
    return "In " + daysApart + " " + days;
}

// Gets the day difference between firstDate and secondDate (negative if backwards):
export function getDaysApart(firstDate, secondDate) {
    return Math.ceil((secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
}

// Returns a new Date with the given number of days added to the given date:
export function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

// Determines all subtasks that should be worked on currently:
export function getCurrentSubtasks(tasks) {
    const result = [];

    for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
        const task = tasks[taskIndex];
        const currSubtask = getCurrentSubtask(task);
        if (!currSubtask) continue;

        result.push({
            subtask: currSubtask,
            subtaskIndex: currSubtask.index,
            task: task,
            taskIndex: taskIndex,
            startDate: currSubtask.startDate,
            endDate: currSubtask.endDate,
        });
    }

    return result;
}

// Determines the subtask in a task that should be worked on currently (if there is one):
export function getCurrentSubtask(task) {
    const currDate = new Date();
    const currTime = currDate.getTime();

    const taskStartDate = stringToDate(task.startDate);
    const taskEndDate = stringToDate(task.endDate);
    const taskDays = getDaysApart(taskStartDate, taskEndDate);
    // If the overall task should not be worked on currently, exit:
    if (currTime < taskStartDate.getTime() || currTime >= addDays(taskEndDate, 1).getTime()) return;

    // Determine the next incomplete subtask:
    let nextSubtask;
    let nextSubtaskIndex = -1;
    let totalWeight = 0.0;
    for (let subtaskIndex = 0; subtaskIndex < task.subtasks.length; subtaskIndex++) {
        const subtask = task.subtasks[subtaskIndex];
        if (nextSubtaskIndex == -1 && !subtask.completed) {
            nextSubtask = subtask;
            nextSubtaskIndex = subtaskIndex;
        }
        totalWeight += subtask.weight;
    }
    // Exit if all subtasks are completed:
    if (nextSubtaskIndex == -1) return;

    // Using its weight, determine what days the next incomplete subtask should be worked on:
    let startDay = 0;
    let endDay = 0;
    let dayOverflow = 0.0;
    for (let subtaskIndex = 0; subtaskIndex <= nextSubtaskIndex; subtaskIndex++) {
        startDay = endDay;

        const subtask = task.subtasks[subtaskIndex];
        const subtaskDays = subtask.weight / totalWeight * taskDays;
        endDay += Math.floor(subtaskDays);
        dayOverflow += subtaskDays % 1;
        if (dayOverflow >= 1.0) {
            dayOverflow--;
            endDay++;
        }
    }

    const startDate = addDays(taskStartDate, startDay);
    const endDate = addDays(taskStartDate, endDay);
    // If the next incomplete subtask should not be worked on currently, exit:
    if (currTime < startDate.getTime() || currTime >= addDays(endDate, 1).getTime()) return;

    // The next incomplete subtask should be worked on today, so return it:
    return {
        name: nextSubtask.name,
        index: nextSubtaskIndex,
        startDate: dateToString(startDate),
        endDate: dateToString(endDate),
    };
}

// Determines the number of days allocated to each subtask in a task using their weights:
export function getSubtaskDays(task) {
    const days = [];

    const taskStartDate = stringToDate(task.startDate);
    const taskEndDate = stringToDate(task.endDate);
    const taskDays = getDaysApart(taskStartDate, taskEndDate);

    let totalWeight = 0.0;
    task.subtasks.forEach(subtask => {
        totalWeight += subtask.weight;
    }); 

    let startDay = 0;
    let endDay = 0;
    let dayOverflow = 0.0;
    for (let subtaskIndex = 0; subtaskIndex < task.subtasks.length-1; subtaskIndex++) {
        startDay = endDay;

        const subtask = task.subtasks[subtaskIndex];
        const subtaskDays = subtask.weight / totalWeight * taskDays;
        endDay += Math.floor(subtaskDays);
        dayOverflow += subtaskDays % 1;
        if (dayOverflow >= 1.0) {
            dayOverflow--;
            endDay++;
        }

        days.push(endDay-startDay);
    }
    days.push(taskDays-endDay);

    return days;
}

// Converts date string (DD/MM/YY) to Date object:
export function stringToDate(dateString) {
    const tokens = dateString.split('/');
    return new Date("20" + tokens[2] + "/" + tokens[1] + "/" + tokens[0]);
}

// Converts Date object to date string (DD/MM/YY):
export function dateToString(date) {
    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/" + date.getYear().toString().slice(-2);
}