import React from 'react'
import {TestCases, Results} from './index'

export default class InputOutputWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showResults: false
    }
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  handleTabClick(event) {
    const {showResults} = this.state
    if (event.target.innerHTML === 'Test Case' && showResults) {
      this.setState({
        showResults: false
      })
    } else if (event.target.innerHTML === 'Results' && !showResults) {
      this.setState({
        showResults: true
      })
    }
  }

  render() {
    const {showResults} = this.state
    const {testCases, outputs, onChange} = this.props
    let testCasesClassName = ''
    let resultsClassName = ''
    if (showResults) {
      resultsClassName = 'active'
    } else {
      testCasesClassName = 'active'
    }
    return (
      <div>
        <div className="tab">
          <button
            className={`tablinks ${testCasesClassName}`}
            onClick={this.handleTabClick}
          >
            Test Case
          </button>
          <button
            className={`tablinks ${resultsClassName}`}
            onClick={this.handleTabClick}
          >
            Results
          </button>
        </div>

        <div id="input" className={`tabcontent ${testCasesClassName}`}>
          <TestCases testCases={testCases} onChange={onChange} />
        </div>

        <div id="results" className={`tabcontent ${resultsClassName}`}>
          <Results testCases={testCases} outputs={outputs} />
        </div>
      </div>
    )
  }
}
