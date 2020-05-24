import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, Tooltip } from '@material-ui/core';
import { AiOutlineFileAdd, AiOutlineDelete } from 'react-icons/ai';
import styles from './LendItems.styles';

function SimpleTable({ rowData, requestId, classes, addLentItem, returnLentItem }) {
  const handleAddIconVisibility = (status, borrowedDate) => {
    if (status === 'ACCEPTED' && borrowedDate === null) {
      return false;
    }
    return true;
  };

  const handleRemoveIconVisibility = status => {
    if (status === 'BORROWED') {
      return false;
    }
    return true;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Item</b>
            </TableCell>
            <TableCell>
              <b>ItemStatus</b>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map(row => (
            <TableRow key={row.Item.id}>
              <TableCell component="th" scope="row">
                {row.Item.ItemSet.title}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell align="right">
                {row.borrowedDate === null ? 'Not Yet' : row.borrowedDate}
              </TableCell>
              <TableCell align="right">{row.dueDate === null ? 'Not Yet' : row.dueDate}</TableCell>
              <TableCell align="right">
                {row.returnedDate === null ? 'Not Yet' : row.returnedDate}
              </TableCell>
              <TableCell>
                <Tooltip title="Lend Item">
                  <span>
                    <IconButton
                      disabled={handleAddIconVisibility(row.status, row.borrowedDate)}
                      onClick={addLentItem(requestId, row.Item.id, row.status)}
                    >
                      <AiOutlineFileAdd />
                    </IconButton>
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Return Item">
                  <span>
                    <IconButton
                      disabled={handleRemoveIconVisibility(row.status)}
                      onClick={returnLentItem(requestId, row.Item.id, row.status)}
                    >
                      <AiOutlineDelete />
                    </IconButton>
                  </span>
                </Tooltip>
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
