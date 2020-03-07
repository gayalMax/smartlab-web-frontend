import React from "react";
import { TextareaAutosize } from "@material-ui/core";
import SimpleSelect from "../miniComponents/DropDown";


function CreateAccount() {
  return (
    <div>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Empty"
        style={{ width: 400, height: 250 }}
      />
      <div style={{flexBasis:50}}>
        <SimpleSelect />
      </div>
    </div>
  );
}

export default CreateAccount;
