import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  AppBar,
  Grid,
  withStyles,
  IconButton,
  Tooltip,
  Toolbar,
  Box,
  Chip
} from '@material-ui/core';
import { Image } from 'cloudinary-react';
import { AiOutlineSync } from 'react-icons/ai';
import AdvancedTable from '../../Common/AdvancedTable';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import styles from './ViewTemporaryItems.styles';

const placeholder = 'https://via.placeholder.com/50';

function ViewTemporaryItemsPresenter({ classes, lentItems, onRefresh, error, loading }) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" elevation={0} color="inherit">
          <Toolbar>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs>
                <p className={classes.title}>View Lent Items</p>
              </Grid>
              <Grid item>
                <Tooltip title="Refresh Lent Items List">
                  <IconButton onClick={onRefresh}>
                    <AiOutlineSync />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={null} error={error} />
          <Grid item>
            <Box px={2}>Below the list of items lent are given</Box>
          </Grid>
          <Grid item>
            <AdvancedTable
              columns={[
                {
                  field: 'image',
                  sorting: false,
                  render: row =>
                    row.image == null ? (
                      <img src={placeholder} className={classes.image} alt={row.id} />
                    ) : (
                      <Image publicId={row.image} className={classes.image} />
                    )
                },
                {
                  field: 'studentId',
                  title: 'Student Id',
                  render: row => <Chip label={row.studentId} />
                },
                {
                  field: 'lab',
                  title: 'Lab Title'
                },
                {
                  field: 'title',
                  title: 'Item Title'
                },
                {
                  field: 'serialNumber',
                  title: 'Serial Number',
                  render: row => <Chip label={row.serialNumber} />
                },
                {
                  field: 'status',
                  title: 'Status',
                  render: row => <Chip color="primary" label={row.status} />
                }
              ]}
              data={lentItems.map(({ lab, request }) => ({
                id: request.id,
                lab: lab.title,
                title: request.Item.ItemSet.title,
                serialNumber: request.Item.serialNumber,
                image: request.Item.ItemSet.image,
                status: request.status,
                studentId: request.studentId
              }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

ViewTemporaryItemsPresenter.defaultProps = {
  error: null
};

ViewTemporaryItemsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  lentItems: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};
export default withStyles(styles)(ViewTemporaryItemsPresenter);
