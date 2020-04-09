import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(9),
    backgroundColor: theme.palette.primary.main
  },
  button: {
    border: '4px solid #fff',
    color: '#FFF',
    borderRadius: 0,
    height: 'auto',
    padding: theme.spacing(2, 5)
  },
  link: {
    fontSize: 22,
    color: '#FFF',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
});

function ProductSmokingHero(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Button
        className={classes.button}
        href="https://openinventoryorg.github.io/docs/"
        target="_blank"
      >
        <Typography variant="h4" component="span">
          Need Help to Get Started?
        </Typography>
      </Button>
      <Typography variant="subtitle1" className={classes.link}>
        Visit our documentation and get started!
      </Typography>
    </section>
  );
}

ProductSmokingHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductSmokingHero);
