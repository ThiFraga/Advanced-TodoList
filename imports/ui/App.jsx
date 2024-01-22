import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Menu from './components/Menu';
import { Outlet, useNavigation } from 'react-router-dom';
import Login from './Login';

const handlelogout = () =>  Meteor.logout();


export default function App() {
  const user = useTracker(() => Meteor.user());
  const navigation = useNavigation();
  return (
    <div>
      <Menu />
      {navigation.state === "loading" && <GlobalSpinner />}
      {user ? <Outlet /> : <Login />}
      
    </div>
  );
}
