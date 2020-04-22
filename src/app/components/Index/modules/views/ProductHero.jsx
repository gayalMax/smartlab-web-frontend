import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage = '/images/home.png';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#23395B',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

function ProductHero(props) {
  const { classes } = props;

  const user = useSelector(state => state.auth.user);
  let linkData = {
    text: 'Sign In',
    url: '#/login'
  };

  if (user) {
    linkData = {
      text: 'Admin Console',
      url: '#/admin/dashboard'
    };
  }

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={`${process.env.PUBLIC_URL}/${backgroundImage}`}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Digitalize Lab Management
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Use the service to manage labs more easily. Especially tuned for computer laboratories.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href={linkData.url}
      >
        {linkData.text}
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Automate and Digitalize
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
