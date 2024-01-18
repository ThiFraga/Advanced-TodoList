import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from "react-router-dom";
import TaskForms from "./components/TaskForms";
import { Button } from "@mui/material";
import { KeyboardReturn } from "@mui/icons-material";

const defaultData = {
    task: "",
    description: "",
    date: "",
    isPersonal: false,
}

export default function CreateTask() {

    const user = useTracker(() => Meteor.user());

    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        formData.username = user.username;

        if(!formData.hasOwnProperty('task') || 
            !formData.hasOwnProperty('description') ||  
            !formData.hasOwnProperty('username') ||
            !formData.hasOwnProperty('date')
        ) throw Meteor.Error('All fields must be completed!') ;

        Meteor.call('tasks.insert',formData);
    }
    return(
        <div className="page">
            <h2>Adicionar Tarefa:</h2>
            <TaskForms handleSubmit={handleSubmit} task={defaultData} create />
            <Button variant="contained" endIcon={<KeyboardReturn />} onClick={() => navigate("/minhas-tarefas")} >Minhas Tarefas</Button>
        </div>
    );
}