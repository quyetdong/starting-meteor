import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "./ContactsCollection";

Meteor.methods({
  "contact.insert"({ name, email, imageUrl }) {
    check(name, String, "Name is string");
    check(email, String);
    check(imageUrl, String);
    if (!name) {
      throw new Meteor.Error("Name is required.");
    }

    return ContactsCollection.insert({
      name,
      email,
      imageUrl,
      createdAt: new Date(),
    });
  },
  "contact.remove"({ contactId }) {
    check(contactId, String);
    if (!contactId) {
      throw new Meteor.Error("Contact id should not be empty.");
    }

    return ContactsCollection.remove({
      _id: contactId,
    });
  },
});
