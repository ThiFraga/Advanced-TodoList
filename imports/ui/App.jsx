import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForms } from './LoginForms';
import Menu from './components/Menu';

const handlelogout = () =>  Meteor.logout();


export default function App() {
  const user = useTracker(() => Meteor.user());


  return (
    <div>
      <Menu />
    </div>
  );
}
