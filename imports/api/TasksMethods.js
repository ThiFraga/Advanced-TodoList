import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
 
Meteor.methods({
  'tasks.insert'(data) {

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      ...data,
      createdAt: new Date,
      situation: 'Cadastrado',
      userId: this.userId,
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },

  'tasks.update'(taskId,updatedTask) {
    check(updatedTask,Object);
    check(taskId,String);

    const task = TasksCollection.findOne({_id: taskId});

    if (!this.userId || this.userId != task.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    if(updatedTask.hasOwnProperty('situation')) delete updatedTask.situation;
    if(updatedTask.hasOwnProperty('createdAt')) delete updatedTask.createdAt;
    if(updatedTask.hasOwnProperty('username')) delete updatedTask.username;
    if(updatedTask.hasOwnProperty('userId')) delete updatedTask.userId;
    if(updatedTask.hasOwnProperty('_id')) delete updatedTask._id;

    TasksCollection.update(taskId , {
      $set: updatedTask,
    });
  },

  'tasks.setSituation'(taskId) {
    check(taskId, String);
    
    const task = TasksCollection.findOne({_id: taskId});
    if(!this.userId || this.userId != task.userId) throw new Meteor.Error('Not authorized');

    switch (task.situation) {
      case "Cadastrado":
        TasksCollection.update(taskId, {
          $set:{
            situation: 'Em Andamento',
          },
        })
        break;
        case "Em Andamento":
          TasksCollection.update(taskId, {
            $set:{
              situation: 'Concluida',
            },
          })
          break;
        default:
          throw new Meteor.Error('Situation must be "Cadastrado" or "Em Andamento"!');
    }

  },

  'tasks.resetSituation'(taskId) {
    check(taskId, String);
    
    const task = TasksCollection.findOne({_id: taskId});
    if(!this.userId || this.userId != task.userId) throw new Meteor.Error('Not authorized');
    TasksCollection.update(taskId, {
      $set:{
        situation: 'Cadastrado',
      },
    })
  }
});