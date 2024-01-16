import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";



export default function TaskForms({ changeData, handleSubmit, user, task, editState = true}) {

    return (
        <div className="page" onSubmit={handleSubmit}>
            <form className="form" >
                <TextField name='task' defaultValue={task?.task} type='text' label='Tarefa' variant='outlined' color='primary' required InputProps={{
                    readOnly: editState,
                }} 
                 onChange={(e) => changeData(e.target.name, e.target.value)}/>

                <TextField name='description' defaultValue={task?.task} type='text' label='Descrição' variant='outlined' color='primary' multiline required InputProps={{
                    readOnly: editState,
                }} onChange={(e) => changeData(e.target.name, e.target.value)}/>

                <TextField name='username' value={task ? task.username : user.username} type='text' label='Criado por:'    variant='standard' color='primary'  InputProps={{
                    readOnly: editState,
                }}/>

                <TextField name='situation' value={task?.situation} type='text' label='Situação'    variant='standard' color='primary'  InputProps={{
                    readOnly: editState,
                }}/>

                <DatePicker format="DD/MM/YYYY" value={dayjs(task?.createdAt)}/>
                   
                <Button variant='contained' type="submit">Criar Tarefa</Button>

            </form>
        </div>
    );
}