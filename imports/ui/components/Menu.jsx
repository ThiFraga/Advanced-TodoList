import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import DrawerMenu from "./DrawerMenu";


export default function Menu() { 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
    return(
        <div className="menuBar">
            <IconButton aria-label="drawer" size="large" onClick={() => setDrawerOpen(true)}> 
              <MenuIcon fontSize="large" color="secondary" />
            </IconButton>
            <div id="menu-title" onClick={() => navigate("/")}>
                <h1>Advanced To-do List</h1>
            </div>
            <Drawer 
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />
            </Drawer>
        </div>
    );
}