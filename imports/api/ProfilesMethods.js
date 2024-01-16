import { Accounts } from 'meteor/accounts-base';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProfilesCollection } from '../db/ProfilesCollection';
 
Meteor.methods({
  'profiles.insert'(profile) {
    const { username, password, ...userData } = profile;

    Accounts.createUser({ username, password });

    ProfilesCollection.insert({
      ...userData,
      createdAt: new Date,
    })
  },

  'profiles.remove'(userId) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = ProfilesCollection.findOne({ _id: userId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    ProfilesCollection.remove(userId);
  },

  'profiles.update'(username, data) {
    
    if(!this.userId) return;

    ProfilesCollection.update(
        {username: username}, 
        {...data}
        );


  },
});