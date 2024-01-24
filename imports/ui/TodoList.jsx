import React, { useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from "../db/TasksCollection";
import { Button, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Checkbox, TextField, IconButton, InputAdornment } from "@mui/material";
import { ArrowLeft, ArrowRight, Assignment, SearchRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




export default function Todolist() {
  const [searchOptions,setSearchOptions] = useState({
    filter: {},
    concluded: false,
    page: 1,
  });

    const handleSearchOptions = (field, value) => {

      const temporaryData = {...searchOptions};
      temporaryData[field] = value;
      setSearchOptions(temporaryData);
    }

    const {tasks, isLoading}  = useTracker(() => {
        const handler = Meteor.subscribe('all-tasks', searchOptions);

        if (!handler.ready()) {
            return { tasks: [], isLoading: true };
        }


        const tasks = TasksCollection.find(
            {},
            {
              sort: { createdAt: -1 },
            }
          ).fetch();

        return  { tasks };
    });
    const navigate = useNavigate();

    const handleSearch = () => {
      const input = document.getElementById('searchbar').value;

      handleSearchOptions('filter',input);
    }

    return (
        <div className="page">
          <Button variant="outlined" color="primary" onClick={() => navigate('/minhas-tarefas')} >Minhas tarefas </Button>
          
          <div>
            <TextField id="searchbar" variant="outlined" color="primary" disabled={isLoading} 
              InputProps={{
                endAdornment: <IconButton onClick={handleSearch} ><SearchRounded /></IconButton> 
                }
              }
            />
          </div>
          
          <FormControlLabel control={<Checkbox checked={searchOptions.concluded} onChange={() => handleSearchOptions('concluded',!searchOptions.concluded)} />} label="Incluir tarefas concluidas" />
            <div>
                {isLoading && <div className="loading">Carregando...</div>}
                <List sx={{width: '100%', maxWidth: '600px'}}>
                    {tasks.map((task)=>(
                        <ListItem key={task._id} disablePadding sx={{borderBottom: '1px solid grey'}}>
                            <ListItemIcon >
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary={task.task} secondary={task.username} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div>
              <IconButton onClick={() => handleSearchOptions('page',searchOptions.page - 1)} disabled={searchOptions.page == 1} >
                <ArrowLeft />
              </IconButton>
              <IconButton onClick={() => handleSearchOptions('page',searchOptions.page + 1)} disabled={tasks.length < 4} >
                <ArrowRight />
              </IconButton>
            </div>

        </div>
    );
}