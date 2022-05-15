import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";

import { TasksCollection } from "../api/TasksCollection.js";
import { Task } from "./Task.jsx";
import { TaskForm } from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm.jsx";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const user = useTracker(() => Meteor.user());

  const deletedFilter = { deletedAt: null };
  const userFilter = user ? { userId: user._id, ...deletedFilter } : deletedFilter;
  const hideCompletedFiler = {
    isChecked: { $ne: true },
    ...userFilter,
  };
  const tasksFilter = hideCompleted ? {...userFilter, ...hideCompletedFiler} : userFilter;

  const tasks = useTracker(() => {
    if (!user) return [];
    return TasksCollection.find(tasksFilter, { sort: { createdAt: -1 } }).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) return 0;
    return TasksCollection.find(hideCompletedFiler).count();
  });
  const pendingTasksTitle = pendingTasksCount ? `(${pendingTasksCount})` : "";

  const onCheckboxClick = (task) => {
    TasksCollection.update(
      { _id: task._id },
      { $set: { isChecked: !task.isChecked } }
    );
  };

  const onDeleteClick = (task) => {
    // TasksCollection.remove({ _id: task._id });
    TasksCollection.update(
      { _id: task._id },
      { $set: { deletedAt: new Date() } }
    );
  };

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>&#x261E; To do List &#x2618;</h1>
            {pendingTasksTitle}
          </div>
        </div>
      </header>
      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>{user.username || user.profile?.name} &#9731;</div>
            <TaskForm userId={user._id} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>
            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={onCheckboxClick}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
