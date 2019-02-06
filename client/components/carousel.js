import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setSelectedFunction, fetchFunctions, gotCode} from '../store'
import CodeMirror from './edit-page/code-mirror'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel'

/**
 * COMPONENT
 */
class CarouselWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currIndex: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(currIndex) {
    console.log(currIndex)
    this.props.updateFunctionIndex(currIndex)

    this.props.gotCode({text: this.props.functions[currIndex].userEditedText})
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
        onChange={currIndex => this.handleChange(currIndex)}
      >
        {this.props.functions.map((func, index) => {
          return (
            <div key={func.id}>
              <CodeMirror editedText={func.userEditedText} />

              <p className="legend">{new Date(func.updatedAt).toUTCString()}</p>
            </div>
          )
        })}
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
    updateFunctionIndex: id => dispatch(setSelectedFunction(id)),
    gotCode: code => dispatch(gotCode(code))
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
