import { useMemo } from 'react';
import { useBattle } from '../../lib/hooks/useBattle';
import Subtitle from '../Subtitle';
import styles from './Colors.module.scss';

const Colors = () => {
  const { currentLevel } = useBattle();

  const handleCopyToClipboard = (color) => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext && false) {
      // navigator clipboard api method
      return navigator.clipboard.writeText(color);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = color;
      textArea.style.position = 'fixed';
      textArea.style.opacity = 0;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    }
  }

  const usedColors = useMemo(() => {
    if (currentLevel?.colors) {
      return currentLevel?.colors.split(',');
    }
    return [];
  }, [currentLevel?.colors]);

  return (
    <>
      <Subtitle title='Colors to use' />
      <ul className={styles.list}>
        {usedColors.map((color) => (
          <li
            key={color}
            className={styles['color-item']}
            onClick={() => handleCopyToClipboard(color)}
          >
            <span className="badge badge-pill bg-dark py-2 px-3">
              <span className={styles['color-circle']} style={{ backgroundColor: color }} />
              {color}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Colors;
