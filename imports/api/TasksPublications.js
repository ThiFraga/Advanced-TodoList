import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});

Meteor.publish('all-tasks', function publishTasks() {
  return TasksCollection.find({
    isPersonal: false,
  });
});

Meteor.publish('number-tasks', function publishTasks(filter) {

  return TasksCollection.find();
})

Meteor.publish('get-task', function publishTask(taskId) {
  return TasksCollection.find({ userId: this.userId, _id: taskId }, { limit: 1 });
});