import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSync, AiOutlineCode } from 'react-icons/ai';
import {
  Paper,
  Grid,
  withStyles,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogActions,
  Button
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Image } from 'cloudinary-react';

import styles from './RequestItem.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

const placeholder = 'https://via.placeholder.com/50';

function RequestItemPresenter({ classes, items, error, loading, onRefresh }) {
  const [attributes, setAttributes] = useState([]);

  const openDialog = item => () => setAttributes(item.ItemAttributes);

  const closeDialog = () => setAttributes([]);

  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>View Requested items</p>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip title="Refresh Item List">
                <IconButton onClick={onRefresh}>
                  <AiOutlineSync />
                </IconButton>
              </Tooltip>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={null} error={error} />

          <Grid item>
            <Box px={2} pb={2}>
              Below the list of items are needed to get permission.
            </Box>
          </Grid>

          <Grid item>
            <AdvancedTable
              columns={[
                {
                  title: 'Serial Number',
                  field: 'serialNumber',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false,
                  render: row => (
                    <ListItem>
                      <ListItemText primary={row.serialNumber} />
                    </ListItem>
                  )
                },
                {
                  title: 'Itemset',
                  field: 'Itemset',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false,
                  render: row => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt={row.ItemSet.id}>
                          {row.ItemSet.image == null ? (
                            <img src={placeholder} className={classes.image} alt={row.id} />
                          ) : (
                            <Image publicId={row.ItemSet.image} className={classes.image} />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={row.ItemSet.title} />
                    </ListItem>
                  )
                },
                {
                  title: 'Lab',
                  field: 'Lab',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false,
                  render: row => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt={row.Lab.id}>
                          {row.Lab.image == null ? (
                            <img src={placeholder} className={classes.image} alt={row.id} />
                          ) : (
                            <Image publicId={row.Lab.image} className={classes.image} />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={row.Lab.title} />
                    </ListItem>
                  )
                },
                {
                  title: 'Attributes',
                  type: 'numeric',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false,
                  render: row => (
                    <Button
                      variant="outlined"
                      disabled={row.ItemAttributes.length === 0}
                      onClick={openDialog(row)}
                      startIcon={<AiOutlineCode />}
                    >
                      Attributes
                    </Button>
                  )
                }
              ]}
              data={
                items &&
                items.map(({ id, serialNumber, ItemSet, Lab, ItemAttributes }) => ({
                  id,
                  serialNumber,
                  ItemSet,
                  Lab,
                  ItemAttributes
                }))
              }
              title=""
            />
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={attributes.length !== 0} onClose={closeDialog} scroll="paper">
        <DialogTitle>Item attributes</DialogTitle>
        <List>
          {attributes.map(attrib => (
            <ListItem key={attrib.key}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={attrib.key} secondary={attrib.value} />
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ProgressOverlay>
  );
}

RequestItemPresenter.defaultProps = {
  error: null
};

RequestItemPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default withStyles(styles)(RequestItemPresenter);
