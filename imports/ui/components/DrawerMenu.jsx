import { Assignment, Close, Logout } from "@mui/icons-material";
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Meteor } from 'meteor/meteor';

export default function DrawerMenu({
  closeDrawer
}) {
  const navigate = useNavigate();

  const handleClick = (option) => {
    if ( option === 'logout' ) {
      Meteor.logout();
      closeDrawer();
      return ;
    }
    navigate(`/${option}`);
    closeDrawer();
  }

  return (
    <div className="drawer-div">
      <IconButton className="close-drawer-btn" onClick={closeDrawer}>
        <Close fontSize="large" color='drawerIcon'/>
      </IconButton>

      <List>
        <ListItem >
          <ListItemButton onClick={() => handleClick("tarefas")}>
            <ListItemIcon >
              <Assignment color="drawerIcon" />
            </ListItemIcon>
            <ListItemText primary="Lista de Tarefas" sx={{fontSize: '22px', fontWeight: '500'}} disableTypography />
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton onClick={() => handleClick("perfil")}>
            <ListItemIcon >
              <Assignment color="drawerIcon" />
            </ListItemIcon>
            <ListItemText primary="Perfil" sx={{fontSize: '22px', fontWeight: '500'}} disableTypography />
          </ListItemButton>
        </ListItem>
        <Divider light/>
        <ListItem >
          <ListItemButton >
            <ListItemIcon onClick={() => handleClick("logout")}>
              <Logout color="drawerIcon" />
            </ListItemIcon>
            <ListItemText primary="Sair" sx={{fontSize: '22px', fontWeight: '500'}} disableTypography />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )
}