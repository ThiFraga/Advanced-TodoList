import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from "react-router-dom";
// import { LoginWithGithub } from './LoginWithGithub';

export const LoginForms = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();
  
  useEffect(() => {
      if (user) return navigate("/");
      return;
  },[user]);

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <form onSubmit={submit} className="login-form">
        <div>
            <label htmlFor="username">Username</label>

            <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="password">Password</label>

            <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div>
            <button type="submit">Log In</button>
        </div>
    </form>
  );
};
