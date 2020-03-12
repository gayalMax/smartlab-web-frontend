import React from "react";
import { Drawer } from "../miniComponents/index";
import Box from "@material-ui/core/Box";

function Template(props) {
  return (
    <Box>
      <Box>
        <Drawer />
      </Box>
      <Box className="main-template" style={{ marginLeft: 250, marginTop: 80 }}>
        {props.displayCreateRole}
      </Box>
    </Box>
  );
}

export default Template;