import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai';

import Typography from '../components/Typography';

function Copyright() {
  return (
    <>
      {'© '}
      <Link color="inherit" href="https://openinventoryorg.github.io/web-frontend/">
        Open Inventory Systems&nbsp;
      </Link>
      {new Date().getFullYear()}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex'
  },
  iconsWrapper: {
    height: 120
  },
  icons: {
    display: 'flex'
  },
  icon: {
    color: '#fff',
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  link: {
    color: '#fff'
  }
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href="https://twitter.com/" className={classes.icon}>
                  <AiOutlineTwitter size={24} />
                </a>
                <a href="https://facebook.com" className={classes.icon}>
                  <AiOutlineFacebook size={24} />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link className={classes.link} href="/">
                  Terms
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link className={classes.link} href="/">
                  Privacy
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Meta
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link className={classes.link} href="/">
                  Login
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link className={classes.link} href="/">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
