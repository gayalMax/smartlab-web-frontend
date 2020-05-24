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

  const handleRemoveIconVisibility = (status, borrowedDate) => {
    if (status === 'ACCEPTED' && borrowedDate != null) {
      return false;
    }
    return true;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Borrowed&nbsp;Date</TableCell>
            <TableCell align="right">Due&nbsp;Date</TableCell>
            <TableCell align="right">Returned&nbsp;Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.foreach(row => (
            <TableRow key={row.item.id}>
              <TableCell component="th" scope="row">
                {row.item.itemSet.title}
              </TableCell>
              <TableCell align="right">{row.borrowedDate}</TableCell>
              <TableCell align="right">{row.dueDate}</TableCell>
              <TableCell align="right">{row.returnedDate}</TableCell>
              <TableCell>
                <Tooltip>
                  <IconButton
                    disabled={handleAddIconVisibility(row.status, row.borrowedDate)}
                    onClick={addLentItem(requestId, row.item.id)}
                  >
                    <AiOutlineFileAdd />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip>
                  <IconButton
                    disabled={handleRemoveIconVisibility(row.status, row.borrowedDate)}
                    onClick={returnLentItem(requestId, row.item.id)}
                  >
                    <AiOutlineDelete />
                  </IconButton>
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
