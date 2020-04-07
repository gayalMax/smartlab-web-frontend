import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSync, AiOutlineCode, AiOutlineEdit, AiOutlineLock } from 'react-icons/ai';
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
import { Image } from 'cloudinary-react';

import styles from './ViewItemSets.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

const placeholder = 'https://via.placeholder.com/50';

function ViewItemSetsPresenter({ classes, itemSets, error, loading, onRefresh }) {
  const [attributes, setAttributes] = useState([]);

  const openDialog = itemset => () => setAttributes(itemset.Attributes);

  const closeDialog = () => setAttributes([]);

  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>View Item Sets</p>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip title="Refresh Tokens List">
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
              Below the list of itemSets in the system are given.
            </Box>
          </Grid>

          <Grid item>
            <AdvancedTable
              columns={[
                {
                  field: 'title',
                  sorting: false,
                  render: row => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt={row.id}>
                          {row.image == null ? (
                            <img src={placeholder} className={classes.image} alt={row.id} />
                          ) : (
                            <Image publicId={row.image} className={classes.image} />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={row.title} />
                    </ListItem>
                  )
                },
                {
                  title: '',
                  type: 'numeric',
                  sorting: false,
                  render: row => (
                    <Button
                      variant="outlined"
                      disabled={row.Attributes.length === 0}
                      onClick={openDialog(row)}
                      startIcon={<AiOutlineCode />}
                    >
                      Attributes
                    </Button>
                  )
                }
              ]}
              data={itemSets.map(({ id, title, image, Attributes }) => ({
                id,
                title,
                image,
                Attributes
              }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={attributes.length !== 0} onClose={closeDialog} scroll="paper">
        <DialogTitle>Item set attributes</DialogTitle>
        <List>
          {attributes.map(attrib => (
            <ListItem key={attrib.key}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {attrib.editable ? <AiOutlineEdit /> : <AiOutlineLock />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={attrib.key} secondary={attrib.defaultValue} />
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

ViewItemSetsPresenter.defaultProps = {
  error: null
};

ViewItemSetsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  itemSets: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default withStyles(styles)(ViewItemSetsPresenter);
