import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setSelectedFunction, fetchFunctions} from '../store'
import CodeMirror from './edit-page/code-mirror'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel'

/**
 * COMPONENT
 */
class CarouselWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      currIndex: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(currIndex) {
    this.setState({currIndex})
    this.props.updateFunctionIndex(currIndex)
  }

  componentDidMount() {
    this.props.fetchFunctions()
  }

  render() {
    if (this.props.functions.length === 0) return 'No Functions'
    return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        onChange={this.handleChange}
      >
        {this.props.functions.map((func, index) => (
          <div key={func.id}>
            <CodeMirror editedText={func.userEditedText} />
            <p className="legend">{new Date(func.updatedAt).toUTCString()}</p>
          </div>
        ))}
      </Carousel>
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
    fetchFunctions: () => dispatch(fetchFunctions()),
    updateFunctionIndex: id => dispatch(setSelectedFunction(id))
  }
}

export default connect(
  mapState,
  mapDispatch
)(CarouselWrapper)

/**
 * PROP TYPES
 */
CarouselWrapper.propTypes = {
  functions: PropTypes.array
}
