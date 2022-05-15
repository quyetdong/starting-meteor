import React, { memo, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useFind, useSubscribe } from "meteor/react-meteor-data";

import { ContactsCollection } from "../api/ContactsCollection";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";
import showMessage from "./lib/showContactMessage";

export const ContactList = () => {
  const isLoading = useSubscribe("contacts");

  const contactList = useFind(() =>
    ContactsCollection.find({}, { sort: { createdAt: -1 } })
  );

  const [errMessage, setError] = useState("");
  const [successMess, setSuccesMess] = useState("");
  const [contactRemoveKey, setContactRemoveKey] = useState("");

  const archiveContact = (e, contactId) => {
    e.preventDefault();
    setContactRemoveKey(contactId);

    Meteor.call("contact.archive", { contactId }, (errorRes, data) => {
      if (errorRes) {
        showMessage({ message: errorRes.error, setMessage: setError });
      } else {
        showMessage({
          message: "Contact archived",
          setMessage: setSuccesMess,
        });
      }
      console.log("** archive contact err ", errorRes);
      console.log("** archive contact ", data);
    });
  };

  const Loading = () => (
    <div className="mt-10">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Loading...
      </h3>
    </div>
  );

  const ContactItem = memo(({ contact }) => {
    return (
      <li className="py-4 flex items-center justify-between space-x-3">
        {errMessage && contact._id == contactRemoveKey && (
          <ErrorAlert message={errMessage} />
        )}
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
              onClick={(event) => archiveContact(event, contact._id)}
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              Archive
            </a>
          </div>
        </div>
      </li>
    );
  });

  if (isLoading()) return <Loading />;

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        {successMess && <SuccessAlert message={successMess} />}
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
