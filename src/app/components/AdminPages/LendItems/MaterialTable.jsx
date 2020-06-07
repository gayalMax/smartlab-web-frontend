import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { Chip, Tooltip } from '@material-ui/core';
import moment from 'moment';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import styles from './LendItems.styles';

function SimpleTable({ rowData, requestId, classes, addLentItem, returnLentItem }) {
  const showLendButton = (status, borrowedDate) => {
    return status === 'ACCEPTED' && borrowedDate === null;
  };

  const showReturnButton = status => {
    return status === 'BORROWED';
  };

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
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Item</b>
            </TableCell>
            <TableCell>
              <b>SN</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell align="right">
              <b>Borrowed&nbsp;Date</b>
            </TableCell>
            <TableCell align="right">
              <b>Due&nbsp;Date</b>
            </TableCell>
            <TableCell align="right">
              <b>Returned&nbsp;Date</b>
            </TableCell>
            <TableCell>
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map(row => (
            <TableRow key={row.Item.id}>
              <TableCell component="th" scope="row">
                {row.Item.ItemSet.title}
              </TableCell>
              <TableCell>
                <Chip size="small" label={row.Item.serialNumber} />
              </TableCell>
              <TableCell>
                <Chip size="small" label={row.status} />
              </TableCell>
              <TableCell align="right">{dateLabel(row.borrowedDate)}</TableCell>
              <TableCell align="right">{dateLabel(row.dueDate)}</TableCell>
              <TableCell align="right">{dateLabel(row.returnedDate)}</TableCell>
              <TableCell>
                {showLendButton(row.status, row.borrowedDate) && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={addLentItem(requestId, row.Item.id, row.status)}
                  >
                    Lend
                  </Button>
                )}

                {showReturnButton(row.status) && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={returnLentItem(requestId, row.Item.id, row.status)}
                  >
                    Receive
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTable.propTypes = {
  rowData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  addLentItem: PropTypes.func.isRequired,
  returnLentItem: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired
};

export default withStyles(styles)(SimpleTable);
