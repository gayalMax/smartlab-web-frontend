/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  withStyles,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button
} from '@material-ui/core';
import {
  AiOutlineSync,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineUser
} from 'react-icons/ai';
import { Image } from 'cloudinary-react';
import styles from './AssignStaff.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

const placeholder = 'https://via.placeholder.com/50';

function AssignStaffPresenter({
  classes,
  labs,
  onRefresh,
  loading,
  error,
  successAssign,
  onAssigned,
  onUnassigned,
  managers
}) {
  const [openUnassigned, setOpenUnassigned] = useState(false);
  const [openAssigned, setopenAssigned] = useState(false);
  const [selectedLab, setSelectedLab] = useState({ Users: [], id: null });

  const handleSelectedLabUnassigned = lab => {
    setSelectedLab(lab);
    setOpenUnassigned(true);
  };

  const handleSelectedLabAssigned = lab => {
    setSelectedLab(lab);
    setopenAssigned(true);
  };

  const handleDialogClose = () => {
    setOpenUnassigned(false);
    setopenAssigned(false);
    setSelectedLab({ Users: [], id: null });
  };

  const onClickAssign = Id => () => {
    onAssigned(selectedLab.id, Id);
  };

  const onClickUnassign = Id => () => {
    onUnassigned(selectedLab.id, Id);
  };

  const selectedLabManagers = {};
  selectedLab.Users.forEach(user => {
    selectedLabManagers[user.id] = user;
  });
  const availableManagers = {};
  managers.forEach(manager => {
    if (selectedLabManagers[manager.id] == null) {
      // Not in the selected lab
      availableManagers[manager.id] = manager;
    }
  });

  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs>
                <p className={classes.title}>Assign Staff Managers</p>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip title="Refresh Labs">
                <IconButton onClick={onRefresh}>
                  <AiOutlineSync />
                </IconButton>
              </Tooltip>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container direction="column" alignItems="stretch">
          <SuccessErrorAlert success={successAssign || null} error={error} />
          <Grid item>
            <AdvancedTable
              columns={[
                {
                  field: 'image',
                  sorting: false,
                  title: 'Image',
                  render: row =>
                    row.image == null ? (
                      <img src={placeholder} className={classes.image} alt={row.id} />
                    ) : (
                      <Image publicId={row.image} className={classes.image} />
                    )
                },
                {
                  title: 'Title',
                  field: 'title',
                  sorting: true
                },
                {
                  title: 'Subtitle',
                  field: 'subtitle',
                  sorting: true
                }
              ]}
              actions={[
                {
                  icon: () => <AiOutlineUserAdd />,
                  tooltip: 'Assign User',
                  onClick: (event, row) => {
                    handleSelectedLabAssigned(row);
                  }
                },
                rowData => ({
                  icon: () => <AiOutlineUserDelete />,
                  disabled: rowData.Users.length === 0,
                  tooltip: 'Unassign User',
                  onClick: (event, row) => {
                    handleSelectedLabUnassigned(row);
                  }
                })
              ]}
              options={{
                actionsColumnIndex: -1
              }}
              data={labs.map(({ id, Users, image, subtitle, title }) => ({
                id,
                Users,
                image,
                subtitle,
                title
              }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="unassigned-dialog-title"
        open={openUnassigned}
        fullWidth
      >
        <DialogTitle id="unassigned-dialog-title">Unassign Staff Members</DialogTitle>
        <List>
          {Object.values(selectedLabManagers).map(user => {
            return (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar>
                    <AiOutlineUser />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={user.email}
                />
                <ListItemSecondaryAction>
                  <Button color="secondary" variant="contained" onClick={onClickUnassign(user.id)}>
                    Unassign
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Dialog>

      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="assigned-dialog-title"
        open={openAssigned}
        fullWidth
      >
        <DialogTitle id="assigned-dialog-title">Assign Staff Members</DialogTitle>
        <List>
          {Object.values(availableManagers).map(user => {
            return (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar>
                    <AiOutlineUser />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={user.email}
                />
                <ListItemSecondaryAction>
                  <Button color="secondary" variant="contained" onClick={onClickAssign(user.id)}>
                    Assign
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </ProgressOverlay>
  );
}
AssignStaffPresenter.defaultProps = {
  error: null,
  successAssign: null
};

AssignStaffPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  labs: PropTypes.array.isRequired,
  managers: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  onAssigned: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onUnassigned: PropTypes.func.isRequired,
  successAssign: PropTypes.string
};

export default withStyles(styles)(AssignStaffPresenter);
