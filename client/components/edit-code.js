import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitEditedText} from '../store'
import Evaluator from '../util/evaluator'
import NProgress from 'nprogress'
import jBeautify from 'js-beautify'

const mapStateToProps = state => {
  return {
    text: state.code.text,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitEditedText: editedText => dispatch(submitEditedText(editedText))
  }
}

export default function editCode(WrappedComponent) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
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
        NProgress.configure({parent: '#inputOutput'})
      }

      componentDidUpdate(prevProps) {
        if (
          (prevProps.loading && !this.props.loading) ||
          prevProps.text !== this.props.text
        ) {
          console.log(prevProps.text, this.props.text)
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
            {...this.state}
            {...this.props}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )
      }
    }
  )
}
