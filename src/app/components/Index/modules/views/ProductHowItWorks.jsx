import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AiOutlineMail, AiOutlineDownload, AiOutlineLock } from 'react-icons/ai';
import { Box } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { SERVER } from '../../../../redux/actions/serverConstants';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#ABDFC1',
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  title: {
    marginBottom: theme.spacing(10)
  },
  number: {
    fontSize: 30,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center'
  },
  text: {
    fontWeight: 300,
    fontSize: 18,
    textAlign: 'center'
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing(8)
  },
  icon: {
    height: 60,
    width: 60,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  }
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <AiOutlineMail className={classes.icon} />
                <Typography className={classes.text}>
                  Accept the invitation sent to your email from the Lab Administrators.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <AiOutlineDownload className={classes.icon} />
                <Typography className={classes.text}>
                  Download Mobile Application from Following Link.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <AiOutlineLock className={classes.icon} />
                <Typography className={classes.text}>
                  Enter server address and credentials to start using the system via Mobile Devices.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="https://openinventoryorg.github.io/web-frontend/app/openinventory.apk"
        >
          Download Mobile App
        </Button>
        <Box pt={2}>
          <Typography className={classes.bottomText}>
            Server address of this website:&nbsp;
            {SERVER}
          </Typography>
        </Box>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHowItWorks);
