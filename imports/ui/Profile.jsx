import React, { useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from "react-router-dom";


export default function Profile() {
    const navigate = useNavigate();

    const logout = async() => {
        Meteor.logout();
    };
    return (
        <div className="page">
            <h1>Essa é o perfil</h1>
            <button type="button" onClick={logout} >Deslogar-se</button>
        </div>
    );
}