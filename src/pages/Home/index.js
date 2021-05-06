import { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import cn from 'classnames';
import { Spinner } from 'react-bootstrap';
import { useBattle } from '../../lib/hooks/useBattle';
import { createPlayer, getPlayer } from '../../lib/api/player';
import { getAllBattles } from '../../lib/api/battles';
import { TOKEN_KEY } from '../../lib/constants';
import styles from './Home.module.scss';

const Home = () => {
  const { setUsername, username } = useBattle();
  const [battles, setBattles] = useState();
  const [teamName, setTeamName] = useState();
  const [selectedBattle, setSelectedBattle] = useState();
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(true);
  const history = useHistory();

  const handleJoin = async () => {
    if (!teamName?.trim()?.length && !username) return;
    if (teamName?.trim()?.length) {
      try {
        const { token } = await createPlayer({ name: teamName });
        if (!token) throw new Error('No token');
        localStorage.setItem(TOKEN_KEY, token);
      } catch (error) {
        console.error(error);
      }
    }
    history.push(`/challenge/${selectedBattle}`);
  };

  const getBattleList = useCallback(async () => {
    try {
      const battles = await getAllBattles();
      setBattles(battles);
    } catch (error) {
      console.error('Error getting battle list', error);
    }
  }, []);

  const getPlayerInfo = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoadingPlayer(false);
    } else {
      try {
        const { player } = await getPlayer();
        if (player?.name) {
          setUsername(player.name);
        }
      } catch (error) {
        console.log('no player info', error);
      } finally {
        setIsLoadingPlayer(false);
      }
    }
  }, [setUsername]);

  useEffect(() => {
    getBattleList();
  }, [getBattleList]);

  useEffect(() => {
    getPlayerInfo();
  }, [getPlayerInfo]);

  return (
    <div className="container-fluid mt-1">
      <figure>
        <p className="h1 text-center text-light mt-5">
          Welcome to the
          <strong className="text-warning"> CSSBattle-ish</strong>
        </p>
        <p className="h3 text-center text-light mt-5">
          Please entre your team name, and select the battle you want to join
        </p>
      </figure>
      {!isLoadingPlayer && !username && (
        <div className="input-group mt-5 justify-content-center">
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="inputGroup-sizing-default">Team name</span>
            <input
              type="text"
              className="form-control"
              value={teamName || ''}
              onChange={({ target }) => setTeamName(target.value)}
            />
          </div>
        </div>
      )}
      {!!battles?.length ? (
        <div className={styles['battle-list']}>
          <div className={styles['battle-list-wrapper']}>
            {battles?.map(({ id, name, duration }) => (
              <div className={cn("form-check", styles.item)} key={id}>
                <label className="form-check-label d-flex align-items-center">
                  <input
                    className="form-check-input h-100"
                    type="radio"
                    name="flexRadioDefault"
                    onChange={() => setSelectedBattle(id)}
                    checked={selectedBattle === id}
                  />
                  {name}
                </label>
                <figcaption className="blockquote-footer ml-2">
                  Duration <cite title="Source Title">{duration} min</cite>
                </figcaption>
              </div>
            ))}
          </div>
          <button
            disabled={!(teamName?.trim() || username) || !selectedBattle || isLoadingPlayer}
            type="button"
            className="btn btn-light px-5 w-50 mt-4"
            onClick={handleJoin}
          >
            <p className="h4">Join!</p>
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center flex-column">
          <Spinner animation="grow" className={styles.spinner} variant="light"/>
          <div className="text-light">Loading battles</div>
        </div>
      )}
    </div>
  )
}

export default Home;