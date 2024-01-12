import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Assignment } from "@mui/icons-material";

const tasks = [
    {
        id: 0,
        task: "Tarefa 0",
        description: 'Descrição aqui ó',
        username: "Thi",
        createdAt: '10/01/2024'
    },
    {
        id: 1,
        task: "Tarefa 1",
        description: 'Descrição aqui ó',
        username: "Thi",
        createdAt: '10/01/2024'
    },
    {
        id: 2,
        task: "Tarefa 2",
        description: 'Descrição aqui ó',
        username: "Thi",
        createdAt: '10/01/2024'
    },
    {
        id: 3,
        task: "Tarefa 3",
        description: 'Descrição aqui ó',
        username: "Thi",
        createdAt: '10/01/2024'
    },
];

export default function Todolist() {

    return (
        <div className="page">
            <div>
                <List sx={{width: '100%', maxWidth: '500px'}}>
                    {tasks.map((task)=>(
                        <ListItem key={task.id} disablePadding sx={{borderBottom: '1px solid grey'}}>
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