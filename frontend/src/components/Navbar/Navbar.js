import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png';
import './Navbar.css';


const Navbar = () => {
    
    const [text, setText] = useState("");

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="#"><img src={logo} className='port-logo' alt="logo"/> Teconect</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-1">
                <input className="form-control mr-sm-2" type="search" placeholder="Search ..." aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>

                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default Navbar;
