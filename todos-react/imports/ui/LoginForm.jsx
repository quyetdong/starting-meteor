import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { LoginWithGithub } from "./LoginWithGithub";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  return (
    <form onSubmit={submit} className="login-form">
      <LoginWithGithub />
      <div>
        <label htmlFor="login-usname">User name</label>
        <input
          type="text"
          placeholder="Username"
          id="login-usname"
          required
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="login-pw">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="login-pw"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  );
};
