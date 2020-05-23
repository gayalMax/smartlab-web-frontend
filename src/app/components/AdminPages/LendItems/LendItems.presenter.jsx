import React from 'react';
import PropTypes from 'prop-types';
import { Paper, AppBar, Grid, Toolbar, withStyles } from '@material-ui/core';
import styles from './LendItems.styles';
import AdvancedTable from '../../Common/AdvancedTable';
import MaterialTable from './MaterialTable';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import ProgressOverlay from '../../Common/ProgressOverlay';

function LendItemsPresenter({
  classes,
  itemRequests,
  addLentItem,
  returnLentItem,
  loading,
  error
}) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Lend Items</p>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid className={classes.wrapper} container direction="column" alignItems="stretch">
          <SuccessErrorAlert success={null} error={error} />
          <AdvancedTable
            // TODO : stop sorting
            columns={[
              {
                title: 'Student First Name',
                field: 'first_name'
              },
              {
                title: 'Student Last Name',
                field: 'last_name'
              },
              {
                title: 'Student Email',
                field: 'email'
              },
              {
                field: 'requestStatus',
                title: 'Request status'
              }
            ]}
            data={itemRequests.map(({ user, status, RequestItems }) => ({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              requestStatus: status,
              RequestItems
            }))}
            detailPanel={[
              {
                tooltip: 'Show Request Items',
                render: rowData => {
                  return (
                    <MaterialTable
                      requestId={rowData.id}
                      rowData={rowData.RequestItems}
                      addLentItem={addLentItem}
                      returnLentItem={returnLentItem}
                    />
                  );
                }
              }
            ]}
            title=""
          />
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

LendItemsPresenter.defaultProps = {
  error: null
};
LendItemsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  itemRequests: PropTypes.array.isRequired,
  addLentItem: PropTypes.func.isRequired,
  returnLentItem: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(LendItemsPresenter);
