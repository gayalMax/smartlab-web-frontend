import React from 'react';
import styles from './CreateLabs.styles';
import { Paper, withStyles, Grid } from '@material-ui/core';
import LabTitleBox from './LabTitleBox/LabTitleBox';

function CreateLabsPresenter({ classes }) {
  return (
    <Paper className={classes.root} >
      <Grid className={classes.wrapper} container direction="column">
        <Grid className={classes.item}  item xs>
          <LabTitleBox title="Enter Lab Title" />
        </Grid>
        <Grid className={classes.item} item sm>
          <LabTitleBox title="Enter Lab Subtitle" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(CreateLabsPresenter);
