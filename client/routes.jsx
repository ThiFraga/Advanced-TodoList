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

  
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path='perfil' element={<Profile />} />
            <Route path='todo-list' element={<Todolist />} />
            <Route path="my-tasks" element={<MyTasks />} />
        </Route>
    )
);

export default function Routes() {
    return <RouterProvider router={router} />;
}