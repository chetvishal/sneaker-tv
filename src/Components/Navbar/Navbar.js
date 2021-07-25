import React, { useRef } from 'react';
import styles from './navbar.module.css';
import '../CSS/badge.css';
import { Hamburger, Tv } from '../../Assets/index';
import { Link } from 'react-router-dom';

export const Navbar = ({ setSearchTxt }) => {

    return (

        <header className={styles.navbar}>
            <nav id={styles.toggleMenu}>

                <input type="checkbox" id={styles.toggleMenu__toggle} />

                <label className={styles.toggleMenu__toggleLabel}>
                    <label htmlFor={styles.toggleMenu__toggle}>
                        <span className={styles.toggleMenu__haburgerIcon}>
                            <Hamburger />
                        </span>
                    </label>
                    <div className={styles.navbar__logo}>
                        <span className={styles.navbar__logoText}>Sneaker.</span>
                        <span><Tv
                            style={{ width: "4rem", height: "4rem", fill: "#909090", cursor: "pointer" }}
                            className={styles.navbar__logoIcon}
                        /></span>
                    </div>

                </label>
                <ul className={styles.navbar__menu}>
                    <li>
                        <input
                            type="text"
                            onChange={e => setSearchTxt(() => e.target.value)}
                            placeholder="Search"
                        />
                    </li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/library">Library</Link></li>
                </ul>
            </nav>
        </header>
    )
}