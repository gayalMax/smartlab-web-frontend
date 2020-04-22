const style = theme => ({
  root: {
    background: `url("${process.env.PUBLIC_URL}/images/admin_wallpaper.png")`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'stretch'
  },
  margin: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  padding: {
    padding: theme.spacing(1)
  },
  textField: {
    minWidth: 300
  },
  paragraph: {
    fontSize: 12
  },
  warning: {
    color: 'red'
  },
  buttonGrid: {
    textAlign: 'right'
  }
});

export default style;
