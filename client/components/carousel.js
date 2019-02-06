import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setSelectedFunction, fetchFunctions} from '../store'

/**
 * COMPONENT
 */
class Carousel extends React.Component {
  componentDidMount() {
    this.props.fetchFunctions()
  }
  render() {
    return (
      <div>
        {this.props.functions.map(func => (
          <p key={func.id}>{func.id}</p>
        ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    functions: state.userFunctions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchFunctions: () => dispatch(fetchFunctions())
  }
}

export default connect(
  mapState,
  mapDispatch
)(Carousel)

/**
 * PROP TYPES
 */
Carousel.propTypes = {
  functions: PropTypes.array
}
