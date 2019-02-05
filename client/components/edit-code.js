import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitEditedText} from '../store'
import Evaluator from '../util/evaluator'
import jBeautify from 'js-beautify'
import NProgress from 'nprogress'

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

export default function editCodeWrapper(WrappedComponent) {
  class EditCodeWrapper extends Component {
    constructor(props) {
      super(props)
      console.log(props.text)
      this.state = {
        editedText: '',
        testCases: undefined,
        testCasesRunning: false,
        outputs: []
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.evaluator = new Evaluator()
    }

    componentDidMount() {
      NProgress.configure({parent: '#inputOutput'})
    }

    componentDidUpdate(prevProps) {
      if (prevProps.text !== this.props.text) {
        this.setState({editedText: jBeautify(this.props.text)})
      }
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

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      )
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditCodeWrapper)
}
