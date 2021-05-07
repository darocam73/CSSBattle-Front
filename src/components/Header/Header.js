import { Link, Route, useHistory } from "react-router-dom";
import { useBattle } from '../../lib/hooks/useBattle';
import cs from 'classnames';
import Timer from '../Timer';
import styles from './Header.module.scss';
import { TOKEN_KEY } from '../../lib/constants';

const Header = () => {
  const { username, setUsername } = useBattle();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUsername();
    history.push('/');
  }

  return (
    <nav className={cs('navbar navbar-dark', styles.navbar)}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex" to="/">
          <img
            src="/logo.png"
            alt=""
            className={cs('d-inline-block align-text-top', styles.logo)}
          />
          CSS Challenge
        </Link>
        <Route path="/challenge/:id" exact>
          <Timer />
        </Route>
        {username && (
          <div className={styles['user-name']}>
            {username}
            <img
              src="/devgurus-logo.png"
              alt=""
              className={cs('d-inline-block align-text-top', styles.avatar)}
            />
            <span className="btn btn-link" onClick={handleLogout}>
              Salir
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header;
