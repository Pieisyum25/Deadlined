# My React Native App - "Deadlined":

<p float="left">
  <img src="https://user-images.githubusercontent.com/80517108/190047865-89bd4118-4260-4491-bc6a-7f9b5128e498.JPG" alt="login screen" width="250"/>
  <img src="https://user-images.githubusercontent.com/80517108/190047945-800e850f-a7cb-47e6-bf6b-2560cca72dc8.JPG" alt="home screen" width="250"/>
  <br>
  <img src="https://user-images.githubusercontent.com/80517108/190048049-32ad44a9-cd25-4b84-bea3-2eaa3fe0a3e4.JPG" alt="task screen" width="250"/>
  <img src="https://user-images.githubusercontent.com/80517108/190048078-6a3a0367-cc43-48d0-ae1d-7e5c8fa3ddf7.JPG" alt="edit task screen" width="250"/>
</p>

### App Description:

“Deadlined” (icon is a cartoon timebomb) is a scheduler app with a strong emphasis on splitting tasks into 
subtasks, each with a deadline and reward, to encourage better time management. The app is bomb themed 
(cartoon-style) with metaphors of splitting big bombs into little bombs, then diffusing those bombs.

Deadlined solves time management problems regarding tasks with deadlines. Specifically, it helps to prevent 
procrastination, which is known for issues like poor work performance and physical/mental health decline [1]. 
Procrastination is caused by demotivating factors like feeling out of control, and distant, intangible outcomes 
[2]. By splitting tasks into manageable subtasks with deadlines and rewards, the motivational power of shorter 
deadlines is utilized [3], and the demotivating factors can be circumvented.

Technologies:
- Built in React Native using the Expo platform.
- Uses Firebase for user authentication and a Firestore database for online persistency.
- Uses Redux for managing local state.
- Uses React Native Navigation for navigating between screens.

How to run:
- Clone the repository with "git clone <repo url>";
- Inside the folder, enter "npm install" to download all the required node modules (requires npm).
- Once that is done, enter "expo start" to start the development server (requires expo cli).
- Finally, to open the app, scan the QR code that pops up via the Expo Go app (on Android), or open it in your browser by pressing "w".

Main Features:
- Users can register and login via email to store their task data online and access it from anywhere.
- Users can add a task, and subtasks within that task. Tasks are given start and end dates, but each 
subtask is given a “weight” value (relative length/difficulty) and the task’s days are allocated 
proportionate to this.
- Users can edit or remove tasks and subtasks.
- Users can “complete” a subtask, which also completes the task if it is the last subtask.
- Users can move between three home screens: “Home” (lists today’s subtasks), “Tasks” (lists all 
tasks/subtasks), and “Calendar” (shows tasks/subtasks on a calendar and updates with any changes).

Target Demographic:
- Anyone regularly juggling big projects (high school/tertiary students, project managers and team members), or 
anyone who struggles with time management or motivation.

References:
- [1]. https://solvingprocrastination.com/procrastination-dangers/
- [2]. https://solvingprocrastination.com/why-people-procrastinate/
- [3]. https://www.psychologytoday.com/us/blog/comparatively-speaking/202106/why-we-procrastinate
