import { useEffect, useCallback, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useBattle } from '../../lib/hooks/useBattle';
import cn from 'classnames';
import WaitingBattleStart from '../../components/WaitingBattleStart';
import BattleFinished from '../../components/BattleFinished';
import Levels from '../../components/Levels';
import Editor from '../../components/Editor';
import Canvas from '../../components/Canvas';
import Colors from '../../components/Colors';
import Target from '../../components/Target';
import ActionButtons from '../../components/ActionButtons';
import Status from '../../components/Status';
import { getBattleStatus } from '../../lib/api/battles';
import { TOKEN_KEY, BATTLE_STATUS } from '../../lib/constants';
import styles from './Battle.module.scss';

const Battle = () => {
  const history = useHistory();
  const { battleId } = useParams();
  const {
    setBattleId,
    setTimer,
    setCurrentLevelId,
    currentLevelId,
    getLevels,
    getLevel,
    setLevels,
    setCurrentLevel,
  } = useBattle();
  const [countdownValue, setCountdownValue] = useState([]);
  const [battleStatus, setBattleStatus] = useState();
  const socket = useRef();

  const startBattle = useCallback(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      history.push(`/`);
    }
    setBattleStatus(BATTLE_STATUS.RUNNING);
  }, [history]);

  const connectToBattleSocket = useCallback(() => {
    if (!battleId) return;
    socket.current = io.connect(process.env.REACT_APP_SOCKET_HOST);

    socket.current.on('connect', () => {
      // console.log(socket.id);
      socket.current.emit('join-room', battleId);
    });

    socket.current.on('join-room-client', data => {
      console.log(`Connected to socket room ${data}`);
    });

    socket.current.on('leave-room-client', data => {
      console.log(`Unsubscribed from room ${data}`);
    });

    socket.current.on('disconnect', () => {
      console.log('WebSocket disconected!');
    });

    socket.current.on('battle-countdown', countdown => {
      setCountdownValue([countdown]);
      setBattleStatus(undefined);
      console.log(socket.current.id, 'starting timer');
    });

    socket.current.on('battle-timer', (data) => {
      setTimer(data);
      setCountdownValue(undefined);
      startBattle();
    });

    socket.current.on('battle-finished', () => {
      setCountdownValue(undefined);
      setBattleStatus(BATTLE_STATUS.FINISHED);
      setTimer(0);
      console.log('Battle finished');
    });
  }, [battleId, setTimer, startBattle]);

  const getBattleInfo = useCallback(async () => {
    try {
      const { finished, waiting, running } = await getBattleStatus(battleId);
      if (running) {
        startBattle();
      } else if (waiting) {
        setBattleStatus(BATTLE_STATUS.WAITING);
      } else if (finished) {
        setBattleStatus(BATTLE_STATUS.FINISHED);
      }
    } catch (error) {
      console.log('error getting battle info...');
    }
  }, [battleId, startBattle]);

  const disconnectFromBattleSocket = useCallback(() => {
    socket.current.emit('disconnect-battle', battleId);
    setTimer(0);
  }, [battleId, setTimer]);

  useEffect(() => {
    if (battleId) {
      setBattleId(battleId);
    }
  }, [battleId, setBattleId]);

  useEffect(() => {
    connectToBattleSocket();
  }, [connectToBattleSocket]);

  useEffect(() => {
    getBattleInfo();
  }, [getBattleInfo]);

  useEffect(() => {
    getLevels();
  }, [getLevels]);

  useEffect(() => {
    if (currentLevelId) {
      getLevel(currentLevelId);
    }
  }, [getLevel, currentLevelId]);

  useEffect(() => {
    return () => {
      disconnectFromBattleSocket();
      setLevels(null);
      setCurrentLevelId(null);
      setCurrentLevel(null);
    }
  }, [disconnectFromBattleSocket, setCurrentLevel, setCurrentLevelId, setLevels]);

  return (
    <div className="container-fluid mt-1">
      {battleStatus === BATTLE_STATUS.WAITING && (
        <WaitingBattleStart battleId={battleId} />
      )}
      {battleStatus === BATTLE_STATUS.FINISHED && (
        <BattleFinished battleId={battleId} />
      )}
      
      {countdownValue?.map((val) => (
        <span className={styles.countdown} key={val}>{val}</span>
      ))}
      {battleStatus === BATTLE_STATUS.RUNNING && (
        <>
          <div className="row mb-1">
            <Levels />
          </div>
          <div className="row">
            <div className={cn('col-4', styles['col-4'])}>
              <span>Editor</span>
            </div>
            <div className={cn('col-4', styles['col-4'])}>
              <span>
                Outpu
              </span>
            </div>
            <div className={cn('col-4', styles['col-4'])}>
              <span>Target</span>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-4">
              <Editor />
            </div>
            <div className="col-4 justify-flex-end">
              <Canvas />
              <Colors />
            </div>
            <div className="col-4">
              <Target />
              <Status />
              <ActionButtons />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Battle;