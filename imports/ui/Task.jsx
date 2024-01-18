import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TasksCollection } from "../db/TasksCollection";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TaskForms from "./components/TaskForms";
import { Button } from "@mui/material";
import { KeyboardReturn } from "@mui/icons-material";

export default function Tasks() {
    const [newData, setNewData] = useState({});
    const [readState, setReadState] = useState(true);
    const { taskId } = useParams();

    const user = useTracker(() => Meteor.user());

    const navigate = useNavigate();

    const handleSubmit = (data) => {
        Meteor.call('tasks.update',taskId, data);
    }

      
    const { task, isLoading } = useTracker(() => {
        
        const userId = Meteor.userId();

        const handle = Meteor.subscribe('get-task', taskId);

        if (!handle.ready() || !userId ) return { task: {}, isLoading: true };

        const task = TasksCollection.findOne({ _id: taskId, userId: userId});

        if(Object.keys(newData).length == 0 ) setNewData(task);
        
        return { task };

    });

    const readMode = () => {
        setReadState(!readState);
    }

    const setSituation = (e) => {
        e.preventDefault();
        Meteor.call('tasks.setSituation',taskId);
        
    }

    const resetSituation = (e) => {
        e.preventDefault();
        Meteor.call('tasks.resetSituation',taskId);
    }
    
    return (
        <div className="page" >
            <h2>Editar tarefas</h2>
            {isLoading ? 
            <div className="loading">Carregando...</div> : 
            <>  
                <Button type="button" variant="contained" onClick={readMode}>{readState ? 'Habilitar Edição' : 'Modo Visualização'}</Button>
                <TaskForms user={user} taskSituation={task.situation} task={newData} handleSubmit={handleSubmit} readState={readState} />
                <div className="situation-buttons" >
                    {
                        (readState && task.situation != 'Concluida') &&
                            <Button type="button" variant="contained" onClick={setSituation}>
                            Mudar tarefa para {
                                task.situation == 'Em Andamento' ? 'Concluida' : 'Em Andamento' 
                            }
                            </Button> 
                    }
                    {
                        (task.situation != 'Cadastrado' && readState) && <Button type="button" variant="contained" onClick={resetSituation}>
                        Mudar tarefa para Cadastrada
                        </Button>
                    }
                </div>
            </>  
            }
            <Button variant="contained" endIcon={<KeyboardReturn />} onClick={() => navigate("/minhas-tarefas")} >Minhas Tarefas</Button>
                
        </div>
    );
}