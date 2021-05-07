import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from '../../Editor/Editor.module.scss';
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

const CodeModal = ({ isOpen, onClose, html, css }) => {
  const [htmlCode, setHtmlCode] = useState();
  const [cssCode, setCssCode] = useState();

  useEffect(() => {
    setHtmlCode(unescape(html));
    setCssCode(unescape(css));
  }, [html, css]);

  return (
    <Modal size="xl" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Solution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col">
            <span className={styles['editor-title']}>HTML</span>
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
                  extraKeys: {'Ctrl-Space': 'autocomplete', 'Tab': 'indentAuto'},
                  readOnly: true,
                }}
              />
            </div>
            <div className="col">
              <span className={styles['editor-title']}>CSS</span>
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
                  extraKeys: {"Ctrl-Space": "autocomplete", 'Tab': 'indentAuto'},
                  readOnly: true,
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CodeModal;