import React from "react";
import { TextareaAutosize, Box, Button } from "@material-ui/core";
import SelectRole from "../miniComponents/DropDown";

function CreateAccount() {
  return (
    <Box>
      <TextareaAutosize
        aria-label="email addresses"
        placeholder="email addresses"
        style={{ width: 500, height: 250 }}
      />
      <Box style={{ flexBasis: 50 }} >
        <SelectRole />
        <Button variant="contained" color="primary" style={{height:40,marginTop:50,marginLeft:200}}>
          CREATE ACCCOUNT
        </Button>
      </Box>
    </Box>
  );
}

export default CreateAccount;
