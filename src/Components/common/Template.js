import React, { Children, useState } from "react";
import { Drawer } from "./index";
import Box from "@material-ui/core/Box";

function Template(props) {
  return (
    <Box>
      <Box>
        <Drawer />
      </Box>
      <Box className="main-template" style={{ marginLeft: 250, marginTop: 80 }}>
        {props.displayDocument}
      </Box>
    </Box>
  );
}

export default Template;
