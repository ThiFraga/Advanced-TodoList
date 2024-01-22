import { Link, TextField, Button, Select, MenuItem, FormControl, InputLabel, Avatar } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  accept: 'image/*'
});

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
          reject(error);
      };
  });
};


const emptyProps = {
      error: false,
      helperText: ''
    }

export const ProfileForms = ({ setPage, handleSubmit, profile, create, readState }) => {
  const [data, setData] = useState(profile);

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

    if(confirmProps.error) return;

    handleSubmit(data);
    
  };

  return (
    <div className='page'>
        <form onSubmit={submit} className="form">

          <TextField 
          id='name' 
          name='name' 
          type='text' 
          label='Nome completo' 
          variant='outlined' 
          color='primary' 
          required 
          value={data?.name}
          onChange={(e) => changeData(e.target.name, e.target.value)}
          InputProps={{
            readOnly: readState,
          }}
          />

          <TextField 
          id='username' 
          name='username' 
          type='text' 
          label='Usuário' 
          variant='outlined' 
          color='primary' 
          required 
          value={data?.username}
          onChange={(e) => changeData(e.target.name, e.target.value)}
          InputProps={{
            readOnly: readState,
          }}
          />

          <TextField 
          id='email' 
          name='email' 
          type='email' 
          label='E-mail' 
          variant='outlined' 
          color='primary' 
          required 
          value={data?.email}
          onChange={(e) => changeData(e.target.name, e.target.value)}
          InputProps={{
            readOnly: readState,
          }}
          />

          {create && 
            <Fragment>
              <TextField 
              id='password' 
              name='password' 
              type='password' 
              label='Senha' 
              variant='outlined' 
              color='primary' 
              required 
              value={data?.password}
              onChange={(e) => changeData(e.target.name, e.target.value)}
              InputProps={{
                readOnly: readState,
              }}
              />

              <TextField 
              id='confirm-password' 
              {...confirmProps} 
              name='confirmPassword' 
              type='password' 
              sx={{width: '300px'}} 
              label='Confirmar Senha' 
              variant='outlined' 
              color='primary' 
              required 
              onChange={(e) => equalPasswords(e.target.value)}
              InputProps={{
                readOnly: readState,
              }}
              />
            </Fragment>
            
          }

          <FormControl 
          sx={{width: '200px', alignSelf: 'flex-start'}}
          >
            <InputLabel id="labelGender">Gênero</InputLabel>
            <Select
              labelId="labelGender"
              id="gender"
              value={data.gender}
              label="Gênero"
              name='gender'
              onChange={(e) => changeData(e.target.name, e.target.value)}
              inputProps={{ readOnly: readState }}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </FormControl>

          <DatePicker 
            disableFuture
            format="DD/MM/YYYY"
            value={dayjs(data?.birthday, 'DD/MM/YYYY')}
            onChange={(value) => changeData('birthday', dayjs(value).format('DD/MM/YYYY'))}
            readOnly={readState}
            label='Aniversário'
          />

          <TextField 
          id='company' 
          name='company' 
          type='company' 
          label='Empresa em que trabalha' 
          variant='outlined' 
          color='primary' 
          required 
          value={data?.company}
          onChange={(e) => changeData(e.target.name, e.target.value)}
          InputProps={{
            readOnly: readState,
          }}
          />

          <div className='profile-avatar'>
            {data?.picture != '' && 
              <Avatar alt={data.name} src={data.picture} sx={{width: 100, height: 100, bgcolor: '#DB6A00' }} />
            }

            <Button component="label" variant="contained" disabled={readState} startIcon={<CloudUploadIcon />}>
              Escolher foto
              <VisuallyHiddenInput type="file" name="picture"
              onChange={
                async(e) => {
                  const img = await convertBase64(e.target.files[0]);
                  changeData(e.target.name, img);
                } 
              } />
            </Button>
          </div>

        

          <div style={{display: "flex", width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Button variant='contained' type="submit" disabled={readState}>{create ? 'Cadastrar' : 'Editar'}</Button>
          </div>
      </form>

      {setPage && 
        <div>
          <Link variant='text' onClick={setPage} color='secondary.light'>Já tenho uma conta!</Link>
        </div>
      } 
    </div>
    
  );
};
