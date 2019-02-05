import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import history from '../../history'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import findOrientation from 'exif-orientation'
import Loader from 'react-loader-spinner'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import ErrorPage from './error-page'
import editCodeWrapper from '../edit-code'

const styles = theme => ({
  bigGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    spacing: 40,
    maxHeight: '100%',
    maxWidth: '100%'
  },
  littleGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    spacing: 40
  },
  image: {
    padding: 10,
    maxWidth: '90%'
  },
  rotatedImage: {
    transform: 'rotate(90deg) scale(0.7)',
    padding: 10,
    paddingLeft: 20,
    maxWidth: '100%'
  },
  paper: {
    width: '95vw',
    height: 'auto',
    minHeight: '95vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
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
    padding: 20
  },
  bigGridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    const {
      handleSubmit,
      handleChange,
      editedText,
      testCases,
      testCasesRunning,
      outputs,
      classes
    } = this.props
    const {image, imageClass} = this.state
    if (this.props.loading)
      return (
        <center>
          <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        </center>
      )
    else if (this.props.error)
      return <ErrorPage classes={classes} error={this.props.error} />
    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <img src="/results.png" alt="results" />
          <Grid container className={classes.bigGrid}>
            <Grid
              item
              xs={12}
              sm={7}
              md={7}
              lg={6}
              xl={6}
              className={classes.bigGridItem}
            >
              <img className={classes[imageClass]} src={image} />
            </Grid>
            <Grid item xs={12} sm={5} md={5} lg={6} xl={6}>
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
                  <PhotoCapture buttonText="Choose Another Image" />
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
  const {text, editedText, image, error} = state.code
  return {
    text,
    editedText,
    image,
    error,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(
  withStyles(styles)(editCodeWrapper(EditPage))
)

EditPage.propTypes = {
  classes: PropTypes.object.isRequired
}
