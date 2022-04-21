import React, { memo } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactList = () => {
  Meteor.subscribe('allContacts');
  const contactList = useTracker(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  });

  const removeContact = (e, contactId) => {
    Meteor.call("contact.remove", { contactId }, (errorRes, data) => {
      console.log(errorRes);
      console.log(data);
    });
  };

  const ContactItem = memo(({ contact }) => {
    return (
      <li className="py-4 flex items-center justify-between space-x-3">
        <div className="min-w-0 flex-1 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={contact.imageUrl}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {contact.name}
            </p>
            <p className="text-sm font-medium text-gray-500 truncate">
              {contact.email}
            </p>
          </div>
          <div>
            <a
              href="#"
              onClick={(event) => removeContact(event, contact._id)}
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              Remove
            </a>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {contactList.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
        </ul>
      </div>
    </div>
  );
};
