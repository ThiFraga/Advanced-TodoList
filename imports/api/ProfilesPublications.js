import { Meteor } from 'meteor/meteor';
import { ProfilesCollection } from '/imports/db/ProfilesCollection';

Meteor.publish('profiles', function publishProfiles() {
  return ProfilesCollection.find({ userId: this.userId });
});