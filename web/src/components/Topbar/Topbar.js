import React from "react";

import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { isAuthenticated, logout, getTeamThatIsAuthenticated } from "../../services/auth";
import "./Topbar.css";

function Topbar({ goBackArrow=true }) {
  const history = useHistory();
  
  function handleLogOut(){  
    logout();
    history.push('/');
  }
  
  return(
    <div className="topbar-container">
      <nav>
        {goBackArrow ? (
          <Link to="/" className="nav-arr nav-btn">
            <FiArrowLeft size={24} color="#58af9b" />
          </Link>
        ): (
          <button style={{opacity:0}}></button>
        )}
        {(isAuthenticated()) ? (
          <Link to={`/team/${getTeamThatIsAuthenticated()}`} className="nav-btn">
            <span>TIME</span>
          </Link>
        ) : (
            <button style={{ opacity: 0 }}></button>
          )}
        {(!isAuthenticated())? (
          <Link to="/auth" className="nav-btn">
            <span>INSCREVER-SE</span>
          </Link>
        ): (
          <button style={{ opacity: 0}}></button>
        )}
        {(isAuthenticated()) ? (
          <button type="button" className="nav-btn" onClick={handleLogOut}>
            <FiLogOut size={24} color="#58af9b" />
          </button>
          ) : (
            <button style={{ opacity: 0 }}></button>
          )}
      </nav>
    </div>
  );
}

export default Topbar;