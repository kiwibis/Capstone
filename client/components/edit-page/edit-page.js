import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import history from '../../history'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import jBeautify from 'js-beautify'
import findOrientation from 'exif-orientation'
import Loader from 'react-loader-spinner'
import Evaluator from '../../util/evaluator'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'

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
      editedText: '',
      testCases: undefined,
      outputs: [],
      image: null,
      imageClass: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.readFile = this.readFile.bind(this)
    this.evaluator = new Evaluator()
  }

  componentDidMount() {
    if (!this.props.loading && !this.props.image) return history.push('/')
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
    try {
      this.setState({
        outputs: await this.evaluator.getResult(code, inputs)
      })
    } catch (error) {
      this.setState({
        outputs: `${error.name ? error.name + ': ' : ''}${error.message}`
      })
    }
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
    const {editedText, testCases, outputs, image, imageClass} = this.state
    const {classes} = this.props
    if (this.props.loading)
      return (
        <center>
          <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        </center>
      )
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
                      testCases={testCases}
                      outputs={outputs}
                      onChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
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
  const {text, editedText, image} = state.code
  return {
    text,
    editedText,
    image,
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
