import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";

export default function AppHeader(props) {
    return (
      <header className="app-header">
        <div className="container">
          <div className="app-branding">
            <Link to="/" className="app-title">
              React Login
            </Link>
          </div>
          <div className="app-branding">
            <Link to="/Acceuil" className="app-title">
              Acceuil
            </Link>
          </div>
          <div className="app-branding">
            <Link to="/Drop" className="app-title">
              Drop
            </Link>
          </div>
          
          <div className="app-options">
            <nav className="app-nav">
             
              {props.authenticated ? (
                 
                <ul>
                  <li className="app-branding">
                    <Link to="/profile" className="app-title">
                      Profile
                    </Link>
                  </li>
                  <li className="app-branding">
                    <a className="app-title" onClick={props.onLogout}>Logout</a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    );
  
}

