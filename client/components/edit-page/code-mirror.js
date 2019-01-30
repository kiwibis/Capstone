import React from 'react'
import 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/mdn-like.css'
import 'codemirror/mode/javascript/javascript.js'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/lint/javascript-lint'

const CodeMirrorWrapper = ({editedText, handleChange}) => {
  return (
    <div>
      <CodeMirror
        value={editedText}
        onBeforeChange={(editor, data, value) => {
          handleChange('editedText', value)
        }}
        name="editedText"
        options={{
          autoFocus: true,
          lineNumbers: true,
          mode: 'javascript',
          theme: 'mdn-like',
          lineSeparator: '\n',
          matchingBrackets: true,
          lint: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        }}
      />
    </div>
  )
}

export default CodeMirrorWrapper
