import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    RouterProvider,
    Outlet
  } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import App from '/imports/ui/App';
import Home from '../imports/ui/Home';
import { LoginForms } from '../imports/ui/LoginForms';
import Profile from '../imports/ui/Profile';
import Todolist from '../imports/ui/Todo-List';

const PrivateRoute = () => {
    const user = useTracker(async() => await Meteor.user());
    return user ? <Outlet /> : <Navigate to="/login" />;
}
  
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route element={<PrivateRoute />}>
                <Route index element={<Home />} />
                <Route path='perfil' element={<Profile />} />
                <Route path='todo-list' element={<Todolist />} />
            </Route>
            <Route path='login' element={<LoginForms />} />
        </Route>
    )
);

export default function Routes() {
    return <RouterProvider router={router} />;
}