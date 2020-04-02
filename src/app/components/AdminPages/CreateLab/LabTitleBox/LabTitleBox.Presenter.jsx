import React from 'react';
import styles from '../CreateLabs.styles';
import { Box, withStyles, Grid, TextField } from '@material-ui/core';

function LabTitleBoxPresenter({ classes,title }) {
    const label = title;
  return (
    <Box>
      <Grid container direction="row">
        <Grid item xs>
          <TextField 
          required
          label={label}
          variant = 'outlined'
        //   fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(styles)(LabTitleBoxPresenter);
