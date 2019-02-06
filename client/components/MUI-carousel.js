import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import {connect} from 'react-redux'
import {setSelectedFunction, fetchFunctions, gotCode} from '../store'
import CodeMirror from './edit-page/code-mirror'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import jBeautify from 'js-beautify'

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
  }
})

class CodeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currIndex: null
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(currIndex) {
    this.setState({currIndex})
    this.props.updateFunctionIndex(currIndex)

    this.props.gotCode({text: this.props.functions[currIndex].userEditedText})
  }

  componentDidMount() {
    this.props.fetchFunctions()
  }

  render() {
    const {classes, functions, handleChange, editedText} = this.props
    if (!functions.length) return 'No Functions'
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={3}>
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

              <GridListTileBar
                title={new Date(func.updatedAt).toUTCString()}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                onClick={() => this.handleSelect(index)}
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
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
    updateFunctionIndex: id => dispatch(setSelectedFunction(id)),
    gotCode: code => dispatch(gotCode(code))
  }
}

CodeList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(CodeList))
