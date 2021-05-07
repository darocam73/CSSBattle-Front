import cn from 'classnames';
import { useBattle } from '../../lib/hooks/useBattle';
import { Spinner } from 'react-bootstrap';
import styles from './Levels.module.scss';

const Levels = () => {
  const { levels, currentLevel, currentLevelId, setCurrentLevelId, isLoadingLevel } = useBattle();

  const matchingClass = (amount) => {
    let classname;
    if (!amount) {
      classname = 'empty';
    } else if (amount < 90) {
      classname = 'low';
    } else if (amount < 97) {
      classname = 'good';
    } else {
      classname = 'high';
    }
    return classname;
  }

  return (
    <div>
      {levels?.map(({ id, matching }, index) => (
        <span
          key={id}
          className={cn(
            'badge badge-pill badge-warning',
            styles.badge,
            {[styles.active]: currentLevel?.id === id},
            styles[matchingClass(matching)],
          )}
          onClick={() => setCurrentLevelId(id)}
        >
          {matching === 100 && (
            <img src="/star.svg" alt="" className={styles.image} />
          )}
          {isLoadingLevel && currentLevelId === id && (
            <Spinner animation="grow" className={styles.spinner} variant="light"/>
          )}
          <span className={styles['level-number']}>{`#${index + 1}`}</span>
        </span>
      ))}
    </div>
  )
}

export default Levels;
