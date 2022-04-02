import React, { useRef, useEffect } from 'react';
import styles from './navbar.module.css';
import '../CSS/badge.css';
import { Hamburger, Tv } from '../../Assets/index';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ setSearchTxt, hideMenu, setHideMenu }) => {

    const check = useRef(null);

    const navigate = useNavigate()

    const handleCheck = () => check.current.checked = false;

    useEffect(() => {
        if (hideMenu)
            handleCheck()
        setHideMenu(() => false)
    })

    return (

        <header className={styles.navbar}>
            <nav id={styles.toggleMenu}>

                <input type="checkbox" id={styles.toggleMenu__toggle} ref={check} />

                <label className={styles.toggleMenu__toggleLabel}>
                    <label htmlFor={styles.toggleMenu__toggle} className={styles.toggleMenu__IconContainer}>
                        <span className={styles.toggleMenu__haburgerIcon}>
                            <Hamburger />
                        </span>
                    </label>
                    <div className={styles.toggleMenu__links}>
                        <Link to="/" className="nostyle"><div className={styles.toggleMenu__item}>Home</div></Link>
                        <Link to="/library" className="nostyle"><div className={styles.toggleMenu__item}>My Library</div></Link>
                        <Link to="/user" className="nostyle"><div className={styles.toggleMenu__item}>Account</div></Link>
                    </div>
                    <div className={styles.navbar__logo} onClick={()=> navigate('/')}>
                        <span className={styles.navbar__logoText}>Sneaker.</span>
                        <span><Tv
                            style={{ width: "4rem", height: "4rem", fill: "#909090", cursor: "pointer" }}
                            className={styles.navbar__logoIcon}
                        /></span>
                    </div>
                    <div className={styles.toggleMenu__searchBox}>
                            <input
                                type="text"
                                onChange={e => setSearchTxt(() => e.target.value)}
                                placeholder="Search"
                                className={styles.toggleMenu__inputBox}
                            />
                    </div>

                </label>
                <ul className={styles.navbar__menu}>
                    <li>
                        <input
                            type="text"
                            onChange={e => setSearchTxt(() => e.target.value)}
                            placeholder="Search"
                            className={styles.toggleMenu__inputBox}
                        />
                    </li>
                    <li><Link to="/" onClick={handleCheck}>Home</Link></li>
                    <li><Link to="/library" onClick={handleCheck}>Library</Link></li>
                    <li><Link to="/user" onClick={handleCheck}>Account</Link></li>
                </ul>
            </nav>
        </header>
    )
}