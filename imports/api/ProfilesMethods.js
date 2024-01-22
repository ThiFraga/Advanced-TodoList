import { Accounts } from 'meteor/accounts-base';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


 
Meteor.methods({
  'profiles.insert'(profile) {
    const { username, password, ...userData } = profile;

    Accounts.createUser({
      username: username,
      password: password,
      profile: userData,
    });

  },

  'profiles.remove'(userId) {
    check(userId, String);

    if(this.userId != userId || !this.userId) throw Meteor.Error("Not authorized");

    Meteor.users.remove(userId);
  },

  'profiles.update'(userId, newData) {
    check(userId,String);
    check(newData, Object);
    
    if(this.userId != userId || !this.userId) throw Meteor.Error("Not authorized");

    const {username, ...profile} = newData;

    Meteor.users.update(userId, {
      $set: {
        username: username,
        profile: profile,
      }
    });

  },
});