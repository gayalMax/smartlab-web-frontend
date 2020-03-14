import React from 'react';
import {
  TextareaAutosize, Box, Button,
} from '@material-ui/core';
import CheckBox from '../MiniComponents/CheckBox';

function CreateRole() {
  return (
    <Box>
      <TextareaAutosize
        aria-label="Role"
        placeholder="Role Name"
        style={{ width: 500, height: 50, marginLeft: 100 }}
      />

      <Box style={{ flexBasis: 50, marginLeft: 150 }}>
        <CheckBox />
      </Box>
      <Button variant="contained" color="primary" style={{ height: 40, marginTop: 30, marginLeft: 200 }}>
        Create Role
      </Button>

    </Box>
  );
}

export default CreateRole;
