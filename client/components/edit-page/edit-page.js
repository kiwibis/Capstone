import React, {Component} from 'react'
import {PhotoCapture} from '../../components'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/mdn-like.css'
import 'codemirror/mode/javascript/javascript.js'
import {Controlled as CodeMirror} from 'react-codemirror2'

let jBeautify = require('js-beautify').js

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      outputs: [],
      image: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.readFile()
  }

  handleChange(value) {
    this.setState({editedText: value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const code = this.state.editedText
    const input = event.target.input.value
    this.setState({outputs: this.getResult(code, [input])})
  }

  getResult(code, inputArray) {
    if (code.slice(0, 8) === 'function') {
      return inputArray.map(input => {
        const codeString = `(${code})(${input})`
        return eval(codeString)
      })
    } else {
      const index = code.indexOf('=')
      const tempFunc = eval(code.slice(index + 1))
      return inputArray.map(input => {
        return tempFunc(input)
      })
    }
  }

  readFile() {
    try {
      const {text} = this.props
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        this.setState({image: fileReader.result, editedText: jBeautify(text)})
      }
      fileReader.readAsDataURL(this.props.image)
    } catch (err) {
      console.error(err)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.readFile()
    }
  }

  render() {
    const {editedText, outputs, image} = this.state
    return (
      <div id="EditPage">
        <div>
          <center>
            <img id="edit-image" src={image} />
          </center>
        </div>
        <div>
          <div>
            <CodeMirror
              value={editedText}
              onBeforeChange={(editor, data, value) => {
                this.handleChange(value)
              }}
              name="code"
              options={{
                autoFocus: true,
                lineNumbers: true,
                mode: 'javascript',
                theme: 'mdn-like',
                lineSeparator: '\n',
                gutters: ['note-gutter', 'CodeMirror-linenumbers']
              }}
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input name="input" type="text" />
              <input type="submit" />
            </div>
          </form>
          <PhotoCapture buttonImage="Retake Image" />
        </div>
        <div>
          <p>{outputs}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {text, editedText, image} = state.code
  return {
    text,
    editedText,
    image
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitEditedText: editedText => dispatch(submitEditedText(editedText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage)
