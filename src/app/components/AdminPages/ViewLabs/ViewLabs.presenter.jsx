import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSync, AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
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
  DialogActions,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { Image } from 'cloudinary-react';
import moment from 'moment';

import styles from './ViewLabs.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';
import { capitalizeFirstLetter } from '../../../helpers/helpers';

const placeholder = 'https://via.placeholder.com/50';

function ViewLabsPresenter({ classes, labs, error, loading, onRefresh }) {
  const [labManagers, setLabManagers] = useState([]);

  const openDialog = lab => () => setLabManagers(lab.Users);

  const closeDialog = () => setLabManagers([]);

  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>View Labs</p>
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
              Below the list of labs in the system are given.
            </Box>
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
                { title: 'Title', field: 'title', render: row => <b>{row.title}</b> },
                { title: 'Subtitle', field: 'subtitle' },
                {
                  title: 'Created',
                  field: 'createdAt',
                  searchable: false,
                  render: row => (
                    <Tooltip title={row.createdAt.toString()}>
                      <i>{moment(row.createdAt).fromNow()}</i>
                    </Tooltip>
                  )
                },
                {
                  title: 'Last Updated',
                  field: 'updatedAt',
                  searchable: false,
                  render: row => (
                    <Tooltip title={row.updatedAt.toString()}>
                      <i>{moment(row.updatedAt).fromNow()}</i>
                    </Tooltip>
                  )
                },
                {
                  title: '',
                  type: 'numeric',
                  sorting: false,
                  render: row => (
                    <Button
                      variant="outlined"
                      disabled={row.Users.length === 0}
                      onClick={openDialog(row)}
                      startIcon={<AiOutlineUsergroupAdd />}
                    >
                      Managers
                    </Button>
                  )
                }
              ]}
              data={labs.map(({ id, title, subtitle, image, createdAt, updatedAt, Users }) => ({
                id,
                title: capitalizeFirstLetter(title),
                subtitle,
                image,
                createdAt,
                updatedAt,
                Users
              }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={labManagers.length !== 0} onClose={closeDialog} scroll="paper">
        <DialogTitle>Assigned Lab Managers</DialogTitle>
        <List>
          {labManagers.map(manager => (
            <ListItem button key={manager.email}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <AiOutlineUser />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${manager.firstName} ${manager.lastName}`}
                secondary={manager.email}
              />
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

ViewLabsPresenter.defaultProps = {
  error: null
};

ViewLabsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  labs: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default withStyles(styles)(ViewLabsPresenter);
