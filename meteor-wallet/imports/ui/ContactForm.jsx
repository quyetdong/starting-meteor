import React, { useState } from "react";
import { ContactFormsCollection } from "../api/contactForms";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const saveContact = (e) => {
    ContactFormsCollection.insert({
      name,
      email,
      imageUrl,
    });
    setName("")
    setEmail("")
    setImageUrl("")
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={changeName} value={name}></input>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={changeEmail} value={email}></input>
      </div>
      <div>
        <label htmlFor="imageUrl">Image Url</label>
        <input type="text" id="imageUrl" onChange={changeImageUrl} value={imageUrl}></input>
      </div>
      <div>
        <button type="button" onClick={saveContact}>
          Save Contact
        </button>
      </div>
    </form>
  );
};
