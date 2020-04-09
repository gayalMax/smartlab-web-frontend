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
                The best luxury hotels
              </Typography>
              <Typography className={classes.text}>
                From the latest trendy boutique hotel to the iconic palace with XXL pool , go for a
                mini-vacation just a few subway stops away from your home.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <AiOutlineCode className={classes.icon} />
              <Typography variant="h5" className={classes.title}>
                New experiences
              </Typography>
              <Typography className={classes.text}>
                Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… your Sundays
                will not be alike.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <AiOutlineApple className={classes.icon} />
              <Typography variant="h5" className={classes.title}>
                Exclusive rates
              </Typography>
              <Typography className={classes.text}>
                By registering, you will access specially negotiated rates that you will not find
                anywhere else.
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
