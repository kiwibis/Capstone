import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import history from '../../history'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import jBeautify from 'js-beautify'
import Evaluator from '../../util/evaluator'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import NProgress from 'nprogress'
import ErrorPage from './error-page'
import Loading from './loading-page'
import {Typography} from '@material-ui/core'
import BreakpointMedia from 'react-media-material-ui/BreakpointMedia'
import classnames from 'classnames'

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
    fontSize: '40px'
  },
  smallImage: {
    minHeight: '100vw'
  }
})

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      testCases: undefined,
      outputs: [],
      image: null,
      imageClass: '',
      testCasesRunning: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.readFile = this.readFile.bind(this)
    this.evaluator = new Evaluator()
  }

  componentDidMount() {
    if (!this.props.loading && !this.props.image) return history.push('/')
    NProgress.configure({parent: '#inputOutput'})
    this.readFile()
  }

  handleChange(inputName, inputValue) {
    this.setState({[inputName]: inputValue})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {editedText, testCases} = this.state
    const code = editedText
    // will invoke the function once even if the user doesn't input anything
    const inputs = testCases ? testCases.trim().split('\n') : ['undefined']
    this.props.submitEditedText(editedText)
    this.setState({
      testCasesRunning: true
    })
    NProgress.start()
    let inc = 0.1,
      progress = 0.0
    let incLoader = setInterval(function() {
      progress += inc
      NProgress.set(progress)
    }, 1000)
    try {
      this.setState({
        outputs: await this.evaluator.getResult(code, inputs),
        testCasesRunning: false
      })
    } catch (error) {
      this.setState({
        outputs: `${error.name ? error.name + ': ' : ''}${error.message}`,
        testCasesRunning: false
      })
    }
    clearInterval(incLoader)
    NProgress.done()
  }

  readFile() {
    if (!this.props.image) return
    try {
      const {text} = this.props
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        this.setState({image: fileReader.result, editedText: jBeautify(text)})
      }
      fileReader.readAsDataURL(this.props.image)
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
    const {editedText, testCases, outputs, image, imageClass} = this.state

    const {classes, error, loading} = this.props
    if (loading) return <Loading />
    else if (error) return <ErrorPage classes={classes} error={error} />
    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" className={classes.title}>
            Your code
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
                  className={classnames(classes.image, classes.smallImage)}
                  src={image}
                />
              </BreakpointMedia>

              <BreakpointMedia min="sm">
                <img className={classes.image} src={image} />
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
                    handleChange={this.handleChange}
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
                  <form
                    onSubmit={this.handleSubmit}
                    className={classes.littleGrid}
                  >
                    <InputOutputWrapper
                      running={this.state.testCasesRunning}
                      testCases={testCases}
                      outputs={outputs}
                      onChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
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
  const {text, editedText, image, error} = state.code
  return {
    text,
    editedText,
    image,
    error,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitEditedText: editedText => dispatch(submitEditedText(editedText))
  }
}

EditPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditPage))
