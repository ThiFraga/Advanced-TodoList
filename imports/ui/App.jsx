import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForms } from './LoginForms';

const handlelogout = () =>  Meteor.logout();


export const App = () => {
  const user = useTracker(() => Meteor.user());


  return (
    <div>
      {user ? 
        <div>
          <h1>
            A tela inicial
          </h1>
          <button type='button' onClick={handlelogout}>Logout</button>
        </div>
        :
        <LoginForms />
      }

      
    </div>
  );
}
