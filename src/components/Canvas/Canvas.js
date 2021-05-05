import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useBattle } from '../../lib/hooks/useBattle';
import { documentContents } from '../utils';

import styles from './Canvas.module.scss';

const Canvas = () => {
  const { htmlCode, cssCode, imageUrl, currentLevel } = useBattle();
  const iframe = useRef();
  const targetImage = useRef();

  const refreshIframeContent = useCallback(() => {
    const document = iframe.current.contentDocument;
    document.open();
    document.write(documentContents(htmlCode, cssCode));
    document.close();
  }, [cssCode, htmlCode]);

  const handleMouseMove = (e) => {
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const targetWidth = parseInt(left + width - clientX);
    targetImage.current.style.width = `${targetWidth}px`;
    targetImage.current.style.borderLeft = '1px solid black';
  }

  const handleMouseLeave = () => {
    targetImage.current.style.width = '0';
    targetImage.current.style.border = 'none';
  }

  useEffect(() => {
    refreshIframeContent();
  }, [refreshIframeContent]);

  return (
    <>
      <div className={styles.wrapper}>
        <iframe
          ref={iframe}
          title="output"
          className={styles.iframe}
        />
        <div className={styles['target-image']} ref={targetImage}>
          {currentLevel?.image && <img src={imageUrl} alt="target" />}
        </div>
        <div
          className={styles.cover}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </>
  )
}

export default Canvas;
