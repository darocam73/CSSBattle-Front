import { useMemo } from 'react';
import { useBattle } from '../../lib/hooks/useBattle';
import Subtitle from '../Subtitle';
import styles from './Colors.module.scss';

const Colors = () => {
  const { currentLevel } = useBattle();

  const handleCopyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
  }

  const usedColors = useMemo(() => {
    if (currentLevel?.colors) {
      return JSON.parse(currentLevel?.colors);
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
