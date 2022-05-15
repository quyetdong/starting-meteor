import {Meteor} from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';

Meteor.publish('allContacts', () => {
  return ContactsCollection.find();
});

Meteor.publish('contacts', () => {
  return ContactsCollection.find({ archive: { $ne: true } });
});
