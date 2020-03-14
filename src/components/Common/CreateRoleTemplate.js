/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Drawer } from '../MiniComponents/index';

function Template(props) {
  const { displayCreateRole } = props;

  return (
    <Box>
      <Box>
        <Drawer />
      </Box>
      <Box className="main-template" style={{ marginLeft: 250, marginTop: 80 }}>
        {displayCreateRole}
      </Box>
    </Box>
  );
}

export default Template;
