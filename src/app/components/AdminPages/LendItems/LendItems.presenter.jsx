import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  AppBar,
  Grid,
  Toolbar,
  withStyles,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@material-ui/core';
import moment from 'moment';
import { AiOutlineBars } from 'react-icons/ai';
import styles from './LendItems.styles';
import AdvancedTable from '../../Common/AdvancedTable';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import ProgressOverlay from '../../Common/ProgressOverlay';

function LendItemsPresenter({
  classes,
  itemRequests,
  addLentItem,
  returnLentItem,
  loading,
  error,
  success
}) {
  const [request, setRequest] = useState(null);

  const requestDialog = content => () => setRequest(content);
  const closeDialog = () => setRequest(null);

  const dateLabel = time => {
    return time === null ? (
      'Not Yet'
    ) : (
      <Tooltip title={time.toString()}>
        <i>{moment(time).fromNow()}</i>
      </Tooltip>
    );
  };

  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Lend/Receive</p>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid className={classes.wrapper} container direction="column" alignItems="stretch">
          <SuccessErrorAlert success={success} error={error} />
          <AdvancedTable
            filtering
            columns={[
              {
                field: 'requestStatus',
                title: 'Request status',
                searchable: false,
                lookup: {
                  ACCEPTED: 'Accepted',
                  REJECTED: 'Rejected',
                  PENDING: 'Pending'
                },
                render: row => (
                  <Chip
                    color="primary"
                    style={{ margin: '2px' }}
                    size="small"
                    label={row.requestStatus}
                  />
                )
              },
              {
                title: 'Student Name',
                field: 'name'
              },
              {
                title: 'Lab',
                field: 'lab'
              },
              {
                title: 'Student Email',
                field: 'email'
              },

              {
                title: 'Attributes',
                sorting: false,
                type: 'numeric',
                render: row => (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={requestDialog(row)}
                    startIcon={<AiOutlineBars />}
                  >
                    Items
                  </Button>
                )
              }
            ]}
            data={itemRequests.map(({ id, User, status, RequestItems }) => ({
              id,
              name: `${User.firstName} ${User.lastName}`,
              email: User.email,
              lab: RequestItems[0].Item.Lab.title,
              requestStatus: status,
              RequestItems
            }))}
            title=""
          />
        </Grid>
      </Paper>

      {request && (
        <Dialog open={request != null} maxWidth="lg" onClose={closeDialog}>
          <DialogTitle>Items</DialogTitle>
          <DialogContent>
            <AdvancedTable
              columns={[
                {
                  title: 'Item Name',
                  field: 'item'
                },
                {
                  title: 'Serial Number',
                  field: 'serialNumber',
                  render: row => <Chip size="small" label={row.serialNumber} />
                },
                {
                  title: 'Status',
                  field: 'status',
                  render: row => <Chip size="small" label={row.status} />
                },
                {
                  title: 'Borrowed Date',
                  field: 'borrowedDate',
                  searchable: false,
                  render: row => dateLabel(row.borrowedDate)
                },
                {
                  title: 'Due Date',
                  field: 'dueDate',
                  searchable: false,
                  render: row => dateLabel(row.dueDate)
                },
                {
                  title: 'Returned Date',
                  field: 'returnedDate',
                  searchable: false,
                  render: row => dateLabel(row.returnedDate)
                },
                {
                  title: 'Actions',
                  type: 'numeric',
                  render: row => {
                    if (row.status === 'ACCEPTED' && row.borrowedDate === null) {
                      return (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            addLentItem(request.id, row.id, row.status);
                            closeDialog();
                          }}
                        >
                          Lend
                        </Button>
                      );
                    }

                    if (row.status === 'BORROWED') {
                      return (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            returnLentItem(request.id, row.id, row.status);
                            closeDialog();
                          }}
                        >
                          Receive
                        </Button>
                      );
                    }
                    return '';
                  }
                }
              ]}
              data={request.RequestItems.map(item => ({
                id: item.Item.id,
                item: item.Item.ItemSet.title,
                serialNumber: item.Item.serialNumber,
                status: item.status,
                borrowedDate: item.borrowedDate,
                dueDate: item.dueDate,
                returnedDate: item.returnedDate
              }))}
              title=""
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ProgressOverlay>
  );
}

LendItemsPresenter.defaultProps = {
  error: null,
  success: null
};
LendItemsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  itemRequests: PropTypes.array.isRequired,
  addLentItem: PropTypes.func.isRequired,
  returnLentItem: PropTypes.func.isRequired,
  error: PropTypes.string,
  success: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(LendItemsPresenter);
