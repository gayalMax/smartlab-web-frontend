const styles = theme => ({
  root: {
    background: `url("${process.env.PUBLIC_URL}/images/admin_wallpaper.png")`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'stretch'
  },
  margin: {
    marginLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrapper: {
    padding: '50px'
  }
});

export default styles;
