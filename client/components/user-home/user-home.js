import React from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CodeMirrorWrapper from '../edit-page/code-mirror'

const UserHome = ({classes, email, functions}) => {
  return (
    <div className={classes.root}>
      <h3>Welcome, {email}</h3>
      <GridList className={classes.gridList} cols={2.5}>
        {functions.map(func => (
          <GridListTile key={func.id}>
            <CodeMirrorWrapper editedText={func.userEditedText} />
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
    </div>
  )
}

export default UserHome
