import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import cn from 'classnames';
import { getScores } from '../../lib/api/score';
import ResultsDetails from '../../components/ResultsDetails';
import styles from './Score.module.scss';

const Score = () => {
  const { battleId } = useParams();
  const [scoresData, setScoresData] = useState();
  const [playerDetailsId, setPlayerDetailsId] = useState(undefined);

  const getBattleList = useCallback(async () => {
    if (!battleId) return;
    try {
      let scores = await getScores(battleId);
      scores.sort((a, b) => a.totalScore < b.totalScore ? 1 : -1);
      setScoresData(scores);
    } catch (error) {
      console.error('Error getting scores data', error);
    }
  }, [battleId]);

  useEffect(() => {
    getBattleList();
  }, [getBattleList]);

  return (
    <div className="container-fluid mt-1">
      <p className="h1 text-center text-light mt-5">
        SCOREBOARD
      </p>
      <div className={cn("row", styles['row-wrapper'])}>
        <div className={cn(styles.col, "col")}>
          <div className={cn(styles.board, "align-items-center d-flex flex-column")}>
            {scoresData?.length === 0 && (
              <div>No results!</div>
            )}
            {scoresData?.map(({ playerId, username, scores, totalScore }, index) => (
              <div
                className="card mt-5"
                style={{width: '400px'}}
                key={playerId}
              >
                {index === 0 && (
                  <img
                    src="/medal.svg"
                    alt=""
                    className={styles.medal}
                  />
                )}
                <div className="card-header h4">
                  <strong>#{index + 1} - {username}</strong>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>{totalScore}</strong> points</li>
                  <li className="list-group-item">Solved <strong>{scores.length}</strong> challenges</li>
                </ul>
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setPlayerDetailsId(playerId)}
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {playerDetailsId && (
          <div className={cn(styles.col, "col-8")}>
            <ResultsDetails
              scores={scoresData.find(({ playerId }) => playerId === playerDetailsId)?.scores}
              onClose={() => setPlayerDetailsId(undefined)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Score;