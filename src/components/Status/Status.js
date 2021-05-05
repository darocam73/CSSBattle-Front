import cn from 'classnames';
import { useBattle } from '../../lib/hooks/useBattle';
import Subtitle from '../Subtitle';
import styles from './Status.module.scss';

const Status = () => {
  const { htmlCode, cssCode, imageMatching, currentLevel } = useBattle();

  const removeSpaces = (string) => {
    return string.replace(/ /g, '').replace(/(?:\r\n|\r|\n)/g, '');
  }

  return (
    <div className={styles.status}>
      <Subtitle title='Status' />
      <div className={cn(styles.info, 'bg-dark')}>
        <p>
          HTML: <span>{`${removeSpaces(htmlCode).length || 0} characters`}</span>
          {currentLevel?.htmlLength && (
            <span className="text-light d-inline small"> (max {currentLevel?.htmlLength})</span>
          )}
        </p>
        <p>
          CSS: <span>{`${removeSpaces(cssCode).length || 0} characters`}</span>
          {currentLevel?.cssLength && (
            <span className="text-light small d-inline"> (max {currentLevel?.cssLength})</span>
          )}
        </p>
        <p>IMAGE MATCHING:{' '}
          {imageMatching === 'loading' ? (
            <div className="spinner-grow text-light spinner-grow-sm" role="status" />
          ) : (
            <span>{imageMatching}</span>
          )}
          <span></span>
        </p>
      </div>
    </div>
  )
}

export default Status;
