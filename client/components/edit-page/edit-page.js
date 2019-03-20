import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import history from '../../history'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import PropTypes from 'prop-types'
import ErrorPage from './error-page'
import Loading from './loading-page'
import classnames from 'classnames'
import editCode from '../edit-code'
import {
  Grid,
  withStyles,
  Paper,
  CssBaseline,
  Typography,
  BreakpointMedia
} from '../../util/MUIComponents'
import styles from '../../util/styling'

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
    const {image} = this.state
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
