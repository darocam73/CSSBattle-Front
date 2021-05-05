import { useEffect, useCallback, useState } from 'react';
import { Link } from "react-router-dom";
import { getBattleById, startBattle } from '../../lib/api/battles';

const WaitingBattleStart = ({ battleId }) => {
  const [battleData, setBattleData] = useState();

  const getBattleInfo = useCallback(async () => {
    try {
      const battle = await getBattleById(battleId);
      setBattleData(battle);
    } catch (error) {
      console.log('error getting battle info');
    }
  }, [battleId]);

  const handleStart = useCallback(async () => {
    if (battleId) {
      try {
        await startBattle(battleId);
      } catch (error) {
        console.error('Error trying to start the battle...', error);
      }
    }
  }, [battleId]);

  useEffect(() => {
    if (battleId) {
      getBattleInfo();
    }
  }, [battleId, getBattleInfo]);

  if (!battleData) return null;

  return (
    <div className="card text-center mt-5">
      <div className="card-header">
        {battleData.name}
      </div>
      <div className="card-body">
        <h4 className="card-title">The battle hasn't started yet!</h4>
        <p className="card-text text-info">Please wait...</p>
        <Link to="/" className="btn btn-primary mt-5">Go back</Link>
      </div>
      {!!battleData?.['is_owner'] && (
        <div className="card-body">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleStart}
          >
            START!
          </button>
        </div>
      )}
      <div className="card-footer text-muted">
        Duration: {battleData.duration} minutes
      </div>
    </div>
  )
};

export default WaitingBattleStart;
