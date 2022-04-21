import {Meteor} from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';

Meteor.publish('allContacts', () => {
  return ContactsCollection.find();
})