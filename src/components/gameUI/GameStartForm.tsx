import { useForm } from 'react-hook-form';
import * as React from 'react';
import { Grid, TextField } from '@material-ui/core';

interface Props {}

const GameStartForm = ({}: Props) => {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container spacing={3}>
      <form noValidate autoComplete="off">
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            name="playername"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            name="tablesize"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            name="turntime"
          />
        </Grid>
      </form>
    </Grid>
  );
};

export default GameStartForm;
