import { Link } from "react-router-dom";
import cn from 'classnames';
import styles from './BattleFinished.module.scss';

const BattleFinished = ({ battleId }) => {
  return (
    <div className={styles.container}>
      <div className={cn("card text-center mt-5", styles.card)}>
        <div className="card-header">
          Battle finished!
        </div>
        <div className="card-body">
          <h4 className="card-title">This battle is over</h4>
          <img
            src="/sadninja-edit.png"
            alt=""
            className={styles.image}
          />
          <Link
            to={`/score/${battleId}`}
            className="btn btn-primary mt-5 d-block"
          >
            View scores
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BattleFinished;
