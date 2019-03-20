import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchFunctions, gotCode} from '../store'
import CodeMirror from './edit-page/code-mirror'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import jBeautify from 'js-beautify'
import {
  withStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  withWidth,
  isWidthUp
} from './MUIComponents'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'noWrap',
    minWidth: '400px'
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  },
  title: {
    color: theme.palette.primary.light
  },
  codeMirror: {
    height: 'auto',
    width: '400px'
  },
  titleBar: {
    backgroundColor: theme.palette.primary.light
  }
})

class CodeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currIndex: null
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.getGridListCols = this.getGridListCols.bind(this)
  }
  getGridListCols() {
    if (isWidthUp('xl', this.props.width)) {
      return 3
    }

    if (isWidthUp('lg', this.props.width)) {
      return 3
    }

    if (isWidthUp('md', this.props.width)) {
      return 2
    }
    if (isWidthUp('sm', this.props.width)) {
      return 2
    }

    return 1
  }

  handleSelect(currIndex) {
    this.setState({currIndex})
    const currFunction = this.props.functions[currIndex]
    this.props.gotCode({
      text: currFunction.userEditedText,
      functionInitialText: currFunction.algoResultText
    })
  }

  componentDidMount() {
    this.props.fetchFunctions()
  }

  render() {
    const {classes, functions, handleChange, editedText} = this.props
    const {currIndex} = this.state
    if (!functions.length) return 'No Functions'

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={this.getGridListCols()}>
          {functions.map((func, index) => (
            <GridListTile
              onClick={() => this.handleSelect(index)}
              key={func.id}
            >
              {index === this.state.currIndex ? (
                <CodeMirror
                  editedText={editedText}
                  handleChange={handleChange}
                />
              ) : (
                <CodeMirror editedText={jBeautify(func.userEditedText)} />
              )}
              {index === this.state.currIndex ? (
                <GridListTileBar
                  title={new Date(func.updatedAt).toUTCString()}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  onClick={() => this.handleSelect(index)}
                />
              ) : (
                <GridListTileBar
                  title={new Date(func.updatedAt).toUTCString()}
                  classes={{
                    title: classes.title
                  }}
                  onClick={() => this.handleSelect(index)}
                />
              )}
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

const mapState = state => {
  return {
    functions: state.userFunctions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchFunctions: () => dispatch(fetchFunctions()),
    gotCode: code => dispatch(gotCode(code))
  }
}

CodeList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapState,
  mapDispatch
)(withWidth()(withStyles(styles)(CodeList)))
