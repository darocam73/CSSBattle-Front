import { useRef, useEffect, useCallback } from 'react';
import styles from './Iframe.module.scss';
import { documentContents } from '../../utils';

const Iframe = ({ html, css }) => {
  const iframe = useRef();

  const refreshIframeContent = useCallback(() => {
    const document = iframe.current.contentDocument;
    document.open();
    document.write(documentContents(html, css));
    document.close();
  }, [css, html]);

  useEffect(() => {
    refreshIframeContent();
  }, [refreshIframeContent]);

  return (
    <iframe
      ref={iframe}
      title="output"
      className={styles.iframe}
    />
  );
}

export default Iframe;
