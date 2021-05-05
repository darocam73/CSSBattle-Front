import { useMemo } from 'react';
import cn from 'classnames';
import { useBattle } from '../../lib/hooks/useBattle';
import styles from './Timer.module.scss';

const Timer = () => {
  const { timer } = useBattle();

  const padStart = (number) => (
    number < 10 ? `0${number}` : number
  );

  const remainingTime = useMemo(() => {
    if (!timer || timer <= 0) return 0;
    const minutes = padStart(Math.floor(timer / 60000));
    const seconds = padStart((timer / 1000 % 60).toFixed(0));
    return `${minutes} : ${seconds}`;
  }, [timer]);

  if (!remainingTime || timer <= 0) return null;

  return (
    <div className={cn(styles.timer, 'text-warning')}>{remainingTime}</div>
  )
}

export default Timer;
