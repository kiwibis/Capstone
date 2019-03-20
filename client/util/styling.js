const styles = theme => ({
  bigGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flexStart',
    justify: 'center',
    spacing: 40,
    maxHeight: '100%',
    maxWidth: '100%',
    padding: '20px'
  },
  gridList: {
    flexWrap: 'noWrap',
    minWidth: '400px'
  },
  codeMirror: {
    height: 'auto',
    width: '400px'
  },
  titleBar: {
    backgroundColor: theme.palette.primary.light
  },
  littleGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center',
    spacing: 40
  },
  image: {
    padding: 10,
    maxWidth: '90%',
    orientation: 'true'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flexStart',
    maxWidth: '95vw'
  },
  errorPage: {
    padding: '0 10vw 0 10vw'
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItems: {
    width: '100%',
    objectFit: 'cover',
    padding: 10
  },
  bigGridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '40px',
    textAlign: 'center',
    padding: '0 6px',
    color: '#789236'
  },
  smallImage: {
    minHeight: '100vw'
  },
  date: {
    fontSize: '16px',
    padding: '10px'
  },
  items: {
    padding: '20px'
  },
  loadingImage: {
    maxWidth: '90vw',
    padding: '30px'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: '80%',
    height: '80%'
  },
  authMain: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  authPaper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  carouselRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  carouselTitleFont: {
    color: theme.palette.primary.light
  },
  landing: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  landingGrid: {
    spacing: 16
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '30vw',
    height: '60vh',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  card1: {
    backgroundColor: '#D9DB9F',
    textAlign: 'center'
  },
  card2: {
    backgroundColor: '#9AB452',
    textAlign: 'center'
  },
  card3: {
    backgroundColor: '#789236',
    textAlign: 'center'
  },
  landingCardsTitle: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    padding: '10% 6px 3%'
  },
  landingTitle: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '40px',
    color: '#789236',
    textAlign: 'center',
    margin: '0 5px 5px'
  },
  landingImage: {
    maxWidth: '90%'
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarSpacer: {
    minHeight: '30px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '100vh',
    overflow: 'auto'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flexEnd',
    justify: 'space-around'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  dropdown: {
    width: 'auto'
  },
  titleLink: {
    paddingLeft: '20px',
    flexGrow: 4
  },
  logo: {
    maxHeight: '50px'
  },
  logoDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100px',
    alignContent: 'center'
  },
  navTitle: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '35px',
    color: 'white'
  },
  tipsLanding: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  tipItem: {
    padding: '5% 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

export default styles
