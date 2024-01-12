import { Delete, Edit, Assignment } from "@mui/icons-material";
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";

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

export default function MyTasks() {
    return (
        <div className="page">
            <div>
                <List >
                    {tasks.map((task)=>(
                        <ListItem key={task.id} disablePadding sx={{borderBottom: '1px solid grey'}}>
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
                            <ListItemButton >
                                <ListItemIcon >
                                    <Edit />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton >
                                <ListItemIcon>
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