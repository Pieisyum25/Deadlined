

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

export function createSubtask(name, reward, weight, completed){
    return {
        name: name || "Subtask",
        reward: reward || "No reward",
        weight: weight || 1.0,
        completed: completed || false,
    }
}

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

export function getDaysApart(firstDate, secondDate) {
    return Math.ceil((secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
}

export function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

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

export function getCurrentSubtask(task) {
    const currDate = new Date();
    const currTime = currDate.getTime();

    const taskStartDate = stringToDate(task.startDate);
    const taskEndDate = stringToDate(task.endDate);
    const taskDays = getDaysApart(taskStartDate, taskEndDate);
    if (currTime < taskStartDate.getTime() || currTime >= addDays(taskEndDate, 1).getTime()) return;

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
    if (nextSubtaskIndex == -1) return;

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
    if (currTime < startDate.getTime() || currTime >= addDays(endDate, 1).getTime()) return;

    return {
        name: nextSubtask.name,
        index: nextSubtaskIndex,
        startDate: dateToString(startDate),
        endDate: dateToString(endDate),
    };
}

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
    for (let subtaskIndex = 0; subtaskIndex < task.subtasks.length; subtaskIndex++) {
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

    return days;
}

export function stringToDate(dateString) {
    const tokens = dateString.split('/');
    return new Date("20" + tokens[2] + "/" + tokens[1] + "/" + tokens[0]);
}

export function dateToString(date) {
    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/" + date.getYear().toString().slice(-2);
}