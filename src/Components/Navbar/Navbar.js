import React, { useRef } from 'react';
import './navbar.css';
import '../CSS/badge.css';
import {Hamburger, Tv} from '../../Assets/index';
import { Link } from 'react-router-dom';

export const Navbar = ({ setSearchTxt }) => {

    return (

        <header>
            <nav id="menuToggle">

                <input type="checkbox" id="nav-toggle" />

                <label className="nav-toggle-label">
                    <label htmlFor="nav-toggle" className="nav-toggle">
                        <span className="hamburger">
                            <Hamburger className="bars" />
                        </span>
                    </label>
                    <div className="logo">
                        <span className="logo-text">Sneaker.</span>
                        <span><Tv style={{ width: "4rem", height: "4rem", fill: "#909090", cursor: "pointer" }} className="logo-icon" /></span>
                    </div>

                </label>
                <ul className="menu">
                    <li>
                        <input type="text" onChange={e => setSearchTxt(()=>e.target.value)} className="nav-inputbox" placeholder="Search "
                            placeholder="Search"
                        />
                    </li>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/library"><li>Library</li></Link>
                </ul>
            </nav>
        </header>
    )
}