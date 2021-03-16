import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav style={{width:"100%"}}className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          <h2 style={{color: "green"}} >Organic Bowl
          </h2>
          </Link>
          <a></a>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item" >
          <Link to="/" className="nav-link">
            List</Link>
          </li>
          <a></a>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create User Log</Link>
          </li>
          <a></a>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Add User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}