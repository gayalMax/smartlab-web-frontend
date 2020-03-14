import React from 'react';
import Box from '@material-ui/core/Box';
import { Drawer } from '../MiniComponents/index';

function Template(props) {
  // eslint-disable-next-line react/prop-types
  const { displayDocument } = props;

  return (
    <Box>
      <Box>
        <Drawer />
      </Box>
      <Box className="main-template" style={{ marginLeft: 250, marginTop: 80 }}>
        {displayDocument}
      </Box>
    </Box>
  );
}


export default Template;
