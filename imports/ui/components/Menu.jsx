import React from "react";
import { IconButton } from "@mui/material";
import { AccountCircleRounded, LoginRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function Menu({ user }) {    
    const navigate = useNavigate();
    return(
        <div className="menuBar">
            <div>
            {
                user ? (
                <IconButton size="large" aria-label="perfil" color="secondary" onClick={()=>navigate("/perfil")} >
                    <AccountCircleRounded  fontSize="large"/>
                </IconButton>
                ):( 
                <IconButton size="large" aria-label="perfil" color="secondary" onClick={()=>navigate("/login")}>
                    <LoginRounded fontSize="large"/>
                </IconButton>
                )
            }
            </div>
            <div id="menuTitle">
                <h1>Advanced To-do List</h1>
            </div>
        </div>
    );
}