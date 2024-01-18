import { Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';



export default function TaskForms({ handleSubmit, task, readState, create, taskSituation }) {
    const [data, setData] = useState(task);

    const changeData = (field, value) => {
        const temporaryData = {...data};
        temporaryData[field] = value;
        setData(temporaryData);
    }
    

    return (
        <div className="page" >
            <form className="form" id="taskForm" onSubmit={(e) =>{ 
                e.preventDefault();
                handleSubmit(data);
                create && setData(task);
            }}>
                <TextField name='task' value={data?.task} type='text' label='Tarefa' variant='outlined' color='primary' required InputProps={{
                    readOnly: readState,
                }} 
                onChange={(e) => changeData(e.target.name, e.target.value)}
                 />

                <TextField name='description' value={data?.description} type='text' label='Descrição' variant='outlined' color='primary' multiline required InputProps={{
                    readOnly: readState,
                }} onChange={(e) => changeData(e.target.name, e.target.value)}
                />
                <FormControlLabel 
                    sx={{
                        display: "flex", 
                        flexDirection: "row", 
                        width:"100%", 
                        alignSelf: "center", 
                        justifySelf: "flex-start"
                    }} 
                    disabled={readState}
                    control={<Checkbox name="isPersonal" checked={data?.isPersonal} 
                    onChange={(e) => changeData(e.target.name, e.target.checked)} />} 
                    label="É uma tarefa pessoal" 
                />

                { !create && 
                <>
                    <TextField name='username' value={data?.username} type='text' label='Criado por:'    variant='standard' color='primary'  InputProps={{
                    readOnly: true,
                    }}/>

                    <TextField  name='situation' value={taskSituation} type='text' label='Situação'    variant='standard' color='primary'  InputProps={{
                    readOnly: true,
                    }}/>
                </>
                }

                <DateTimePicker ampm={false} ampmInClock={false} disablePast format="DD/MM/YYYY HH:mm"  onChange={(value) => changeData('date', dayjs(value).format('DD/MM/YYYY HH:mm'))}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                    }}
                    value={dayjs(data?.date, 'DD/MM/YYYY HH:mm')}
                    readOnly={readState} 
                /> 
                <Button variant='contained' type="submit" disabled={readState}>{!create ? 'Editar Tarefa' : 'Criar Tarefa'}</Button>

            </form>
        </div>
    );
}