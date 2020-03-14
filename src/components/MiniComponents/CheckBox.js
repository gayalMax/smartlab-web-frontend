import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup column >
      
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
            color="primary"
          />
        }
        label="Condition 1"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedC}
            onChange={handleChange('checkedC')}
            value="checkedC"
            color="primary"
          />
        }
        label="Condition 2"
      /><FormControlLabel
      control={
        <Checkbox
          checked={state.checkedD}
          onChange={handleChange('checkedD')}
          value="checkedD"
          color="primary"
        />
      }
      label="Condition 3"
    /><FormControlLabel
    control={
      <Checkbox
        checked={state.checkedE}
        onChange={handleChange('checkedE')}
        value="checkedE"
        color="primary"
      />
    }
    label="Condition 4"
  /><FormControlLabel
  control={
    <Checkbox
      checked={state.checkedF}
      onChange={handleChange('checkedF')}
      value="checkedF"
      color="primary"
    />
  }
  label="Condition 5"
/><FormControlLabel
        control={
          <Checkbox
            checked={state.checkedG}
            onChange={handleChange('checkedG')}
            value="checkedG"
            color="primary"
          />
        }
        label="Condition 6"
      />
    </FormGroup>
  );
}
