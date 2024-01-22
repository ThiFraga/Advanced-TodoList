import React, { useState } from "react";
import { LoginForms } from "./components/LoginForms";
import { ProfileForms } from "./components/ProfileForms";
import { Meteor } from "meteor/meteor";

const defaultProfileData = {
    name: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    birthday: '',
    company: '',
    picture: ''
}

export default function Login() {
    const [login,setLogin] = useState(true);
    const setPage = () => {
        setLogin(!login);
    }

    const handleProfileSubmit = (data) => {
        
        Meteor.call('profiles.insert', data);

        Meteor.loginWithPassword(data.username, data.password);
        navigate("/");
    }

    return (
    login  ? 
    <LoginForms setPage={setPage}/> 
    : 
    <ProfileForms create setPage={setPage} handleSubmit={handleProfileSubmit} profile={defaultProfileData} />) ;
}