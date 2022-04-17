import React from 'react';
import { ContactForm } from './ContactForm.jsx';
import { ContactList } from './ContactList.jsx';

export const App = () => (
  <div>
    <h1>Contact Form</h1>
    <ContactForm />
    <ContactList />
  </div>
);
