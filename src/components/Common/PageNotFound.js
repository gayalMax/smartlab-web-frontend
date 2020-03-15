import React from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import Image404 from '../../images/Img404.png';

const imgStyle = {
  image: {
    display: 'block',
    maxWidth: '800px',
    maxHeight: '100%',
    margin: 'auto',
  },
  container: {
    margin: 'auto',
    padding: '50px',
  },

  button: {
    display: 'block',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',


  },
};

const PageNotFound = () => {
  const [state, setState] = React.useState({
    redirect: false,
  });

  const handleClick = () => {
    setState({ ...state, redirect: true });
  };

  if (state.redirect) {
    return (<Redirect push to="/" />);
  }

  return (
    <div style={imgStyle.container}>
      <img src={Image404} style={imgStyle.image} alt="404" />
      <Button
        style={imgStyle.button}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Go Home
      </Button>
    </div>
  );
};

export default PageNotFound;
