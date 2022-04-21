import { ContactsCollection } from './ContactsCollection'

Meteor.methods({
  'contact.insert'({
    name,
    email,
    imageUrl,
  }) {
    if (!name) {
      throw new Meteor.Error('Name is required.');
    }

    return ContactsCollection.insert({
      name,
      email,
      imageUrl,
      createdAt: new Date()
    });
  },
})

Meteor.methods({
  'contact.remove'({
    contactId
  }) {
    if (!contactId) {
      throw new Meteor.Error('Contact id should not be empty.');
    }

    return ContactsCollection.remove({
      _id: contactId
    });
  },
})
