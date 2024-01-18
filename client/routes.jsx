import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
  } from "react-router-dom";
import App from '/imports/ui/App';
import Home from '../imports/ui/Home';
import Profile from '../imports/ui/Profile';
import Todolist from '../imports/ui/TodoList';
import MyTasks from "../imports/ui/MyTasks";
import Tasks from "../imports/ui/Task";
import CreateTask from "../imports/ui/CreateTask";

  
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path='perfil' element={<Profile />} />
            <Route path='tarefas' element={<Todolist />} />
            <Route path="minhas-tarefas" element={<MyTasks />} />
            <Route path="editar-tarefa/:taskId" element={<Tasks />} />
            <Route path="criar-tarefa" element={<CreateTask />} />
        </Route>
    )
);

export default function Routes() {
    return <RouterProvider router={router} />;
}