import React from "react";
import { Link } from 'react-router-dom'
import styles from './Navbar.css'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Quick Start Example</h1>
        <div className={styles.navContent}>
          <div className={styles.navLinks}>
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notis</Link>
          </div>
          <button className="button">
            Refresh Posts
          </button>
          <button className="button">
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};
