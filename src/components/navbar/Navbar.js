import React from "react";
import styles from "./Navbar.css";
import { Link } from 'react-router-dom'

export const Navbar = ()=> {
  return (
    <nav>
      <section>
        <h1>Redux Quick Start Example</h1>
        <div className={styles.navContent}>
          <div className={styles.navLinks}>
            <Link to="/">Posts</Link>
          </div>
          <button>Refresh Posts</button>
          <button>Refresh notifications</button>
        </div>
      </section>
    </nav>
  );
};
