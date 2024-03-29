import { Link, TextField, Button} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForms = ({ setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async(e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
    navigate("/");
  };

  return (
    <div className='page'>
        <form onSubmit={submit} className="form">

          <TextField id='username' name='username' type='text' label='Username' variant='outlined' color='primary' required onChange={(e) => setUsername(e.target.value)}/>

          <TextField id='password' name='password' type='password' label='password' variant='outlined' color='primary' required onChange={(e) => setPassword(e.target.value)}/>

          <div>
              <Button type="submit" color='primary' className='submitButton'>Entrar</Button>
          </div>
      </form>
      <div>
        <Link onClick={setPage} color='secondary.light' className='loginLink'>Criar uma conta!</Link>
      </div>
    </div>
    
  );
};
