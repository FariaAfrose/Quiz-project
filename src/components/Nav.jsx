import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Link } from 'react-router-dom';
import classes from '../styles/Nav.module.css';
import Account from './Account';
import logo from '../assets/images/logo-bg.png';

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src={logo} alt="'learn with me Logo" />
            <h3>Learn with me</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
