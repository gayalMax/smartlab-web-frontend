import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { AiOutlineCompass, AiOutlineCode, AiOutlineApple } from 'react-icons/ai';

import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    display: 'flex',
    position: 'relative'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  icon: {
    height: 60,
    width: 60
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  text: {
    fontSize: 18,
    fontWeight: 300,
    textAlign: 'center'
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180
  }
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <AiOutlineCompass className={classes.icon} />
              <Typography variant="h5" className={classes.title}>
                Time Saving
              </Typography>
              <Typography className={classes.text}>
                This is the time to reduce paperwork for inventory management system and save our time.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <AiOutlineCode className={classes.icon} />
              <Typography variant="h5" className={classes.title}>
                More efficient
              </Typography>
              <Typography className={classes.text}>
                Open inventory system supports more efficient way to lend a lab item without going place to place.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <AiOutlineApple className={classes.icon} />
              <Typography variant="h5" className={classes.title}>
                Free of charge
              </Typography>
              <Typography className={classes.text}>
                Open inventory system is open source project. So anyone can experience this application.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductValues);
