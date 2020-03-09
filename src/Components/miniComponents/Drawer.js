import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
// import Hidden from "@material-ui/core/Hidden";
// import IconButton from "@material-ui/core/IconButton";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import MailIcon from "@material-ui/icons/Mail";
// import MenuIcon from "@material-ui/icons/Menu";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import { Box } from "@material-ui/core";
// import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerAdmin = ["Create Account", "Create Lab"];

  // const routeChange = (pathVariable) => {
  //   let path = `/${pathVariable}`;
  //   let history = useHistory();
  //   history.push(path);
  // };

  const drawer = (
    <div>
      <AppBar />
      <div className={classes.toolbar} />
      <Divider />
      <List style={{ backgroundColor: "#63e695" }}>
        {drawerAdmin.map((text, index) => (
          <Fragment>
            <Divider />
            <ListItem
              button
              key={text}
              style={{ backgroundColor: "white", margin: 4 }}
              // onClick ={routeChange(text)}
            >
              <ListItemText primary={text} />
            </ListItem>
          </Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box>
      <div className={classes.root}>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Box xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Box>
        </nav>
      </div>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any
};

export default ResponsiveDrawer;
