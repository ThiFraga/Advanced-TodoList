import React, { useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from "../db/TasksCollection";
import { Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const { user, tasksCreated, tasksOnGoing, tasksConcluded, isLoading } = useTracker(() => {
      const user = Meteor.user();
      const handler = Meteor.subscribe('number-tasks');

      if(!handler.ready()) return {user:user, isLoading: true, tasksCreated: 0, tasksOnGoing: 0, tasksConcluded: 0}
      
      const tasksCreated = TasksCollection.find({
        situation: 'Cadastrado',
      }).count();
      
      const tasksOnGoing = TasksCollection.find({
        situation: 'Em Andamento',
      }).count();

      const tasksConcluded = TasksCollection.find({
        situation: 'Concluida',
      }).count();

      return {user:user, tasksCreated: tasksCreated, tasksOnGoing: tasksOnGoing, tasksConcluded: tasksConcluded};
    });

    return (
        <div className="page">
            <div>
                <h2>Boas Vindas ao Advanced To-do List, {user?.profile?.name}! </h2>
            </div>
            { isLoading ? <h3>Carregando...</h3> : 
              <div className="container-cards">

                <Card className="card">
                  <CardContent className="card-content">
                    <p className="card-text" >Tarefas cadastradas: </p>
                    <p className="card-number">{tasksCreated}</p>
                  </CardContent>
                </Card>

                <Card className="card">
                  <CardContent className="card-content">
                    <p className="card-text" >Tarefas em andamento: </p>
                    <p className="card-number">{tasksOnGoing}</p>
                  </CardContent>
                </Card>

                <Card className="card">
                  <CardContent className="card-content">
                    <p className="card-text" >Tarefas concluidas: </p>
                    <p className="card-number">{tasksConcluded}</p>
                  </CardContent>
                </Card>

              </div>}
              <Button variant="outlined" color="primary" onClick={() => navigate("/tarefas")}>Acessar lista de tarefas</Button>

        </div>
    );
}