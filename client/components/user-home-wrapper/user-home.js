import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CodeMirror from '../edit-page/code-mirror'
import InputOutputWrapper from '../edit-page/input-output-wrapper'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  littleGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    spacing: 40
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
})

const UserHome = props => {
  const {
    classes,
    testCasesRunning,
    testCases,
    outputs,
    handleSubmit,
    handleChange
  } = props
  return (
    <div className={classes.root}>
      <h3>Welcome, {props.email}</h3>
      <GridList className={classes.gridList} cols={2.5}>
        {props.functions.map(func => (
          <GridListTile key={func.id}>
            <CodeMirror
              editedText={func.userEditedText}
              handleChange={handleChange}
            />
            <GridListTileBar
              title={func.updatedAt}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
            />
          </GridListTile>
        ))}
      </GridList>
      <form className={classes.littleGrid}>
        <InputOutputWrapper
          running={testCasesRunning}
          testCases={testCases}
          outputs={outputs}
          onChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  )
}

UserHome.propTypes = {
  email: PropTypes.string,
  updateFunction: PropTypes.func,
  removeFunction: PropTypes.func
}

export default withStyles(styles)(UserHome)
