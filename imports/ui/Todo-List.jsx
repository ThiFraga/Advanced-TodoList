import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AssignmentIndRounded } from "@mui/icons-material";

const tasks = [
    {
        id: 0,
        task: "Tarefa 0",
        createdAt: '10/01/2024'
    },
    {
        id: 1,
        task: "Tarefa 1",
        createdAt: '10/01/2024'
    },
    {
        id: 2,
        task: "Tarefa 2",
        createdAt: '10/01/2024'
    },
    {
        id: 3,
        task: "Tarefa 3",
        createdAt: '10/01/2024'
    },
];

export default function Todolist() {

    return (
        <div className="page">
            <div>
                <List>
                    {tasks.map((task)=>(
                        <ListItem key={task.id} >
                            <ListItemIcon >
                                <AssignmentIndRounded />
                            </ListItemIcon>
                            <ListItemText>
                                <p>{task.task}</p>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>

        </div>
    );
}