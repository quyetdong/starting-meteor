import React from 'react';
import { ContactForm } from './ContactForm.jsx';
import { ContactList } from './ContactList.jsx';
import { Header } from './Header.jsx';

export const App = () => (
  <div>
    <Header />
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto p-2">
        <ContactForm />
        <ContactList />
      </div>
    </div>
  </div>
);
