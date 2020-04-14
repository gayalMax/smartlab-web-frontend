const styles = theme => ({
  root: {
    padding: 15,
    maxWidth: 936,
    margin: 'auto'
    // overFlow: 'scroll'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  margin: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  cardViewWrapper: {
    padding: 10
  },
  emptyGrid: {
    width: '100%',
    height: 100
  },
  image: {
    borderRadius: 8,
    width: '50px'
  }
});

export default styles;
