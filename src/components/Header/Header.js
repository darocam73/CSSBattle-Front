import {
  Link,
  Route,
} from "react-router-dom";
import { useBattle } from '../../lib/hooks/useBattle';
import cs from 'classnames';
import Timer from '../Timer';
import styles from './Header.module.scss';

const Header = () => {
  const { username } = useBattle();

  return (
    <nav className={cs('navbar navbar-dark', styles.navbar)}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex" to="/">
          <img
            src="/devgurus-logo.png"
            alt=""
            className={cs('d-inline-block align-text-top', styles.logo)}
          />
          CSS Challenge
        </Link>
        <Route path="/challenge/:id" exact>
          <Timer />
        </Route>
        {username && (
          <div className={styles['user-name']}>{username}</div>
        )}
      </div>
    </nav>
  )
}

export default Header;
