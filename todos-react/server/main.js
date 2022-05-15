import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { TasksCollection } from '../imports/api/TasksCollection';
import './oauth-config'

const SEED_USERNAME = 'meteorite1';
const SEED_EMAIL = 'quyetdv@dgroup.co';
const SEED_PASSWORD = 'meteor-pw';

const insertTask = (taskText, userId) => TasksCollection.insert({
  text: taskText,
  userId,
  createdAt: new Date(),
});

Meteor.startup(() => {
  if (!Accounts.findUserByEmail(SEED_EMAIL)) {
    Accounts.createUser({
      email: SEED_EMAIL,
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);
  if (TasksCollection.find().count() === 0) {
    ['Coding in the evening', 'Jogging in the afternoon']
      .forEach(text => insertTask(text, user._id))
  }
});
