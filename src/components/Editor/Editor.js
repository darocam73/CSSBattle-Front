import { useBattle } from '../../lib/hooks/useBattle';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from './Editor.module.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';

const Editor = () => {
  const { htmlCode, cssCode, setHtmlCode, setCssCode } = useBattle();

  return (
    <>
      <CodeMirror
        className={styles['code-editor']}
        value={htmlCode}
        options={{
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'xml',
          htmlMode: true,
          keyMap: 'sublime',
          theme: 'material',
          autoCloseTags: true,
          lineWrapping: true,
          extraKeys: {'Ctrl-Space': 'autocomplete', 'Tab': 'indentAuto'}
        }}
        onBeforeChange={(editor, data, value) => {
          setHtmlCode(value)
        }}
      />
      <p>CSS</p>
      <CodeMirror
        className={styles['code-editor']}
        value={cssCode}
        options={{
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'css',
          keyMap: "sublime",
          theme: 'material',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineWrapping: true,
          extraKeys: {"Ctrl-Space": "autocomplete", 'Tab': 'indentAuto'}
        }}
        onBeforeChange={(editor, data, value) => {
          setCssCode(value);
        }}
      />
    </>
  )
}

export default Editor;