import React, { useEffect, useState } from "react";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ProfileForms } from "./components/ProfileForms";
import { Button } from "@mui/material";


export default function Profile() {
    const [readState, setReadState] = useState(true);
    const profile = useTracker(() => {
        const user = Meteor.user()
        return {
            _id: user._id,
            username: user.username,
            ...user.profile,
        }
    });
    const readMode = () => {
        setReadState(!readState);
    }

    const logout = async() => {
        Meteor.logout();
    };

    const handleSubmit = (data) => {
      const {_id, ...newData} = data;

      Meteor.call('profiles.update',_id, newData);
    }
    
    const handleDeleteAccount = (e) => {
      e.preventDefault();

      Meteor.call('profiles.remove', profile._id);
    }

    return (
        <div className="page">
            <div style={{display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center", alignItems: "center"}}>
               <h1>Essa é o perfil</h1>
                <button type="button" onClick={logout} >Deslogar-se</button> 
            </div>
            <Button type="button" variant="contained" onClick={readMode}>{readState ? 'Habilitar Edição' : 'Modo Visualização'}</Button>
            <ProfileForms readState={readState} handleSubmit={handleSubmit} profile={profile}/>
            <Button type="button" variant="contained" onClick={handleDeleteAccount}>Excluir Conta</Button>

        </div>
    );
}