import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});

Meteor.publish('all-tasks', function publishTasks(params) {
  const options = ['Cadastrado', 'Em Andamento'];
  const skipNumber = 4*(params.page - 1);

  if(params.concluded) options.push('Concluida');
  
  const regex = new RegExp(params.filter,'i');

  return TasksCollection.find({
    $or: [
      {$and: [{ isPersonal: true, }, { userId: this.userId, }]},
      {isPersonal: false,}
    ],
    situation: {
      $in: options,
    },
    task: {
      $regex: regex,
    }
  },{
    limit: 4,
    skip: skipNumber,
    sort: {
      createdAt: -1,
    }
  });
});

Meteor.publish('tasks-to-count', function publishTasks() {

  return TasksCollection.find({},{
    fields: {
      situation: 1
    }
  });
})

Meteor.publish('get-task', function publishTask(taskId) {
  return TasksCollection.find({ userId: this.userId, _id: taskId }, { limit: 1 });
});