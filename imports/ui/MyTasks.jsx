import { Delete, Edit, Assignment, AddTask } from "@mui/icons-material";
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon, Button } from "@mui/material";
import { useTracker } from 'meteor/react-meteor-data';
import React from "react";
import { TasksCollection } from "../db/TasksCollection";
import { Meteor } from 'meteor/meteor';
import { useNavigate } from "react-router-dom";



export default function MyTasks() {
    const user = useTracker(() => Meteor.user());

    const navigate = useNavigate();

    const userFilter = user ? { userId: user._id } : {};
    

    const {tasks, isLoading}  = useTracker(() => {
        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()) {
            return { tasks: [], isLoading: true };
        }
        const tasks = TasksCollection.find(
            userFilter,
            {
              sort: { createdAt: -1 },
            }
          ).fetch();

        return  {tasks};
    });

    const handleRemoveTask = (id) => {
        Meteor.call('tasks.remove', id);
    }


    return (
        <div className="page">
          <Button variant="outlined" color="primary" onClick={() => navigate('/tarefas')} >Ver todas as tarefas </Button>
            <div className="container">
                <Button variant="contained" endIcon={<AddTask />}  onClick={() => navigate("/criar-tarefa")} >Nova Tarefa</Button>

            </div>
            <div className="container">
                <h2>Minhas tarefas</h2>
                {isLoading && <div className="loading">Carregando...</div>}
                <List>
                    { tasks.map((task)=>(
                        <ListItem key={task._id} disablePadding sx={{borderBottom: '1px solid grey'}}>
                            <ListItemButton >
                                <ListItemIcon >
                                    <Assignment />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemText 
                                primary={task.task} 
                                secondary={task.username} 
                                sx={{display: 'flex', 
                                flexDirection: 'column', 
                                flexGrow: '1', 
                                width: '100%'
                                }} 
                            />
                            <ListItemButton onClick={() => navigate(`/editar-tarefa/${task._id}`)}>
                                <ListItemIcon >
                                    <Edit />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton onClick={() => handleRemoveTask(task._id)} >
                                <ListItemIcon >
                                    <Delete />
                                </ListItemIcon>
                            </ListItemButton>
                            
                        </ListItem>
                    ))}
                </List>
            </div>

        </div>
    );
}