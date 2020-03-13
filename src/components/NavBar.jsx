import React from 'react';
import { Link } from '@reach/router';

const NavBar = props => {
  return (
    <nav>
      <Link className="nav-button" to="/">
        Students
      </Link>
      <Link className="nav-button" to="/graduates">
        Graduates
      </Link>
    </nav>
  );
};

export default NavBar;
