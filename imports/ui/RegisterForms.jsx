import { Link, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import { addNewUser } from '../api/ProfilesMethods';

const emptyProps = {
      error: false,
      helperText: ''
    }

export const RegisterForms = ({ setPage }) => {
  const [data, setData] = useState({
    name: '',
    username: '',
    gender: '',
    password: ''
  });
  const [confirmProps, setConfirmProps] = useState(emptyProps);

  const changeData = (field, value) => {
    const temporaryData = {...data};
    temporaryData[field] = value;
    setData(temporaryData);
  }

  const equalPasswords = (value) => {

    if (data.password != value) {
        setConfirmProps({
          error: true,
          helperText: 'As senhas devem ser idênticas!'
        });
    } else {
      setConfirmProps({
        error: false,
        helperText: ''
      });}
  }

  const submit = e => {
    e.preventDefault();

    if(confirmProps == emptyProps) return;
    addNewUser(data);

    
  };

  return (
    <div className='page'>
        <form onSubmit={submit} className="login-form">

          <TextField id='name' name='name' type='text' sx={{width: '300px'}} label='Nome completo' variant='outlined' color='primary' required onChange={(e) => changeData(e.target.name, e.target.value)}/>

          <TextField id='username' name='username' type='text' sx={{width: '300px'}} label='Usuário' variant='outlined' color='primary' required onChange={(e) => changeData(e.target.name, e.target.value)}/>

          <TextField id='password' name='password' type='password' sx={{width: '300px'}} label='Senha' variant='outlined' color='primary' required onChange={(e) => changeData(e.target.name, e.target.value)}/>

          <TextField id='confirm-password' name='confirmPassword' type='password' sx={{width: '300px'}} label='Confirmar Senha' variant='outlined' color='primary' required onChange={(e) => equalPasswords(e.target.value)}/>

          <FormControl sx={{width: '200px', alignSelf: 'flex-start'}}>
            <InputLabel id="labelGender">Gênero</InputLabel>
            <Select
              labelId="labelGender"
              id="gender"
              value={data?.gender}
              label="Gênero"
              name='gender'
              onChange={(e) => changeData(e.target.name, e.target.value)}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </FormControl>




          <div>
            <Button variant='contained' type="submit">Cadastrar</Button>
          </div>
      </form>
      <div>
        <Link variant='text' onClick={setPage} color='secondary.light'>Já tenho uma conta!</Link>
      </div>
    </div>
    
  );
};
