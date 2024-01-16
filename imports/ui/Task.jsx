import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TasksCollection } from "../db/TasksCollection";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TaskForms from "./components/TaskForms";

export default function Tasks() {
    const [newData, setNewData] = useState({});
    const [editState, setEditState] = useState(true);
    const { taskId } = useParams();

    const user = useTracker(() => Meteor.user());

    const changeData = (field, value) => {
        const temporaryData = {...newData};
        if (!temporaryData.username || temporaryData.username != user.username) temporaryData.username = user.username;
        temporaryData[field] = value;
        setNewData(temporaryData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        
    }

      
    const { task, isLoading } = useTracker(() => {
        
        const userId = Meteor.userId();

        const handle = Meteor.subscribe('get-task', taskId);

        if (!handle.ready() || !userId ) return { task: {}, isLoading: true };

        const task = TasksCollection.findOne({ _id: taskId, userId: userId});
        return { task };

    });

    return (
        <div className="page">
            <h2>Editar tarefas</h2>
            {isLoading ? 
            <div className="loading">Carregando...</div> : 
            <TaskForms changeData={changeData} user={user} task={task} handleSubmit={handleSubmit} editState={editState} />
            }
            
                
        </div>
    );
}