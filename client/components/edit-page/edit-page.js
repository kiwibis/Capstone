import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import history from '../../history'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import ErrorPage from './error-page'
import Loading from './loading-page'
import {Typography} from '@material-ui/core'
import BreakpointMedia from 'react-media-material-ui/BreakpointMedia'
import classnames from 'classnames'
import editCode from '../edit-code'
import findOrientation from 'exif-orientation'

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
  rotatedImage: {
    transform: 'rotate(90deg)',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 'auto',
    height: 'auto',
    minHeight: '45vw',
    maxHeight: '50vw',
    maxWidth: '600px'
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
    alignItems: 'center',
    objectFit: 'cover'
  },
  title: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '40px'
  },
  smallImage: {
    minHeight: '90vw'
  }
})

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      image: null,
      imageClass: ''
    }
    this.readFile = this.readFile.bind(this)
  }

  componentDidMount() {
    if (!this.props.loading && !this.props.image) return history.push('/')
    this.readFile()
  }

  readFile() {
    if (!this.props.image) return
    try {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        this.setState({image: fileReader.result})
      }
      fileReader.readAsDataURL(this.props.image)
      findOrientation(this.props.image, (err, orientation) => {
        if (!err) {
          if (orientation.rotate === 90) {
            this.setState({
              imageClass: 'rotatedImage'
            })
          } else {
            this.setState({
              imageClass: 'image'
            })
          }
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.readFile()
    }
  }

  render() {
    const {image, imageClass} = this.state
    const {editedText, testCases, testCasesRunning, outputs} = this.props
    const {handleChange, handleSubmit} = this.props
    const {classes, error, loading} = this.props
    if (loading) return <Loading />
    else if (error) return <ErrorPage classes={classes} error={error} />
    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" className={classes.title}>
            Your Code
          </Typography>
          <Grid container className={classes.bigGrid}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className={classes.bigGridItem}
            >
              <BreakpointMedia max="xs">
                <img
                  className={classnames(
                    classes[imageClass],
                    classes.smallImage
                  )}
                  src={image}
                />
              </BreakpointMedia>

              <BreakpointMedia min="sm">
                <img className={classes[imageClass]} src={image} />
              </BreakpointMedia>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Grid container className={classes.littleGrid}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={classes.gridItems}
                >
                  <CodeMirror
                    editedText={editedText}
                    handleChange={handleChange}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={classes.gridItems}
                >
                  <form onSubmit={handleSubmit} className={classes.littleGrid}>
                    <InputOutputWrapper
                      running={testCasesRunning}
                      testCases={testCases}
                      outputs={outputs}
                      onChange={handleChange}
                      handleSubmit={handleSubmit}
                    />
                  </form>
                  <p />
                  <p />
                  <p />
                  <PhotoCapture text="Take another photo" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {image, error} = state.code
  return {
    image,
    error
  }
}

EditPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(editCode(EditPage)))
