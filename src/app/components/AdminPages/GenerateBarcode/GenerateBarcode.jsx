import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, AppBar, Toolbar, Grid, Paper, Box } from '@material-ui/core';
import { exportComponentAsJPEG, exportComponentAsPDF } from 'react-component-export-image';
import Barcode from 'react-barcode';
import { withStyles } from '@material-ui/core/styles';

import styles from './GenerateBarcode.styles';

// eslint-disable-next-line react/prefer-stateless-function
class BarcodeComponent extends React.Component {
  render() {
    const { barcode } = this.props;
    if (barcode == null) {
      return (
        <>
          <Box height={80} />
          <Typography style={{ fontSize: 18 }}>Generate New Barcode from Button Below</Typography>
          <Box height={80} />
        </>
      );
    }
    return <Barcode value={barcode} />;
  }
}

function GenerateBarcode({ classes }) {
  const getNewBarcode = () => {
    const digits = 15;
    const pad = 10 ** (digits - 1);
    const bc = Math.floor(pad + Math.random() * 9 * pad);
    return `GEN${bc}`;
  };

  const [barcode, setBarcode] = useState(getNewBarcode());

  const handleGenerate = () => {
    setBarcode(getNewBarcode());
  };

  const componentRef = useRef();

  return (
    <Paper className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <p className={classes.title}>Generate Barcode</p>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
        {/* <SuccessErrorAlert success={success} error={error} /> */}
        <Grid item>
          <Box px={2} pb={2}>
            Create random bar codes and print them.
          </Box>
        </Grid>

        <Box textAlign="center" py={2}>
          <BarcodeComponent ref={componentRef} barcode={barcode} />
        </Box>

        <Grid item>
          <Box py={1} textAlign="right">
            <Button
              style={{ marginRight: 5 }}
              className={classes.margin}
              variant="contained"
              color="primary"
              onClick={handleGenerate}
            >
              Generate New Barcode
            </Button>
            <Button
              style={{ marginRight: 5 }}
              className={classes.margin}
              variant="contained"
              color="default"
              onClick={() => exportComponentAsPDF(componentRef)}
            >
              Export as PDF
            </Button>
            <Button
              className={classes.margin}
              variant="contained"
              color="default"
              onClick={() => exportComponentAsJPEG(componentRef)}
            >
              Export as Image
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

BarcodeComponent.defaultProps = {
  barcode: null
};

BarcodeComponent.propTypes = {
  barcode: PropTypes.string
};

GenerateBarcode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenerateBarcode);
