import React from 'react';
import { Typography, Link } from '@material-ui/core';

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/openinventoryorg/">
        Open Inventory Organization
      </Link>
      &nbsp;
      {new Date().getFullYear()}
      .&nbsp;
    </Typography>
  );
}

export default Footer;
