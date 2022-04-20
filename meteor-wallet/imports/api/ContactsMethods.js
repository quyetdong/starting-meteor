import { ContactFormsCollection } from './ContactForms'

Meteor.methods({
  'contact.insert'({
    name,
    email,
    imageUrl,
  }) {
    if (!name) {
      throw new Meteor.Error('Name is required.');
    }

    ContactFormsCollection.insert({
      name,
      email,
      imageUrl,
    });
  },
})
