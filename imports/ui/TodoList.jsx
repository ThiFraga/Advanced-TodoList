import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from "../db/TasksCollection";
import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Assignment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Todolist() {
    const {tasks, isLoading}  = useTracker(() => {
        const handler = Meteor.subscribe('all-tasks');

        if (!handler.ready()) {
            return { tasks: [], isLoading: true };
        }
        const tasks = TasksCollection.find(
            {},
            {
              sort: { createdAt: -1 },
            }
          ).fetch();

        return  { tasks };
    });
    const navigate = useNavigate();

    return (
        <div className="page">
          <Button variant="outlined" color="primary" onClick={() => navigate('/minhas-tarefas')} >Minhas tarefas </Button>
            <div>
                {isLoading && <div className="loading">Carregando...</div>}
                <List sx={{width: '100%', maxWidth: '600px'}}>
                    {tasks.map((task)=>(
                        <ListItem key={task._id} disablePadding sx={{borderBottom: '1px solid grey'}}>
                            <ListItemIcon >
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary={task.task} secondary={task.username} />
                        </ListItem>
                    ))}
                </List>
            </div>

        </div>
    );
}