import styles from './Target.module.scss';
import { useBattle } from '../../lib/hooks/useBattle';

const Target = () => {
  const { currentLevel, imageUrl } = useBattle();

  return (
    <div className={styles['target-image']}>
      {currentLevel?.image && <img src={imageUrl} alt="target" />}
    </div>
  )
}

export default Target;
