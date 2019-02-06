import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import Evaluator from '../../util/evaluator'
import NProgress from 'nprogress'

export default function editCode(wrappedComponent) {
  return <EditCodeWrapper WrappedComponent={wrappedComponent} />
}

class EditCode extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      testCases: undefined,
      outputs: [],
      testCasesRunning: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.evaluator = new Evaluator()
  }

  componentDidMount() {
    NProgress.configure({parent: '#inputOutput'})
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
    const {WrappedComponent} = this.props
    return <WrappedComponent {...this.state} {...this.props} />
  }
}

const mapStateToProps = state => {
  const {text, editedText} = state.code
  return {
    text,
    editedText,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitEditedText: editedText => dispatch(submitEditedText(editedText))
  }
}

const EditCodeWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCode)
