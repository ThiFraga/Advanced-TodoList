
import React from "react";
import { useNavigate } from "react-router-dom";


export default function Menu() { 
  const navigate = useNavigate();
    return(
        <div className="menuBar">
            <div id="menu-title" onClick={() => navigate("/")}>
                <h1>Advanced To-do List</h1>
            </div>
        </div>
    );
}