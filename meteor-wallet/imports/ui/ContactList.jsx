import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ContactFormsCollection } from '../api/ContactForms';

export const ContactList = () => {
  const contactList = useTracker(() => {
    return ContactFormsCollection.find().fetch();
  });

  return (
    <>
      <h2>Contact List</h2>
      <ul>{contactList.map(
        contact => <li key={contact._id}>
          {contact.name} - {contact.email}
        </li>
      )}</ul>
    </>
  );
};
