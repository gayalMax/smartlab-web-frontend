const styles = theme => ({
  root: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden'
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
    padding: '16px'
  },
  gridList: {
    flexWrap: 'nowrap'
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

export default styles;
