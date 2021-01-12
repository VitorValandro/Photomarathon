import React from "react";

import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import "./Topbar.css";

function Topbar({goBackArrow=true, auth=false, team=false}) {
  const { goBack } = useHistory();
  
  return(
    <div className="topbar-container">
      <nav>
        {goBackArrow ? (
          <button type="button" className="nav-arr nav-btn" onClick={goBack}>
            <FiArrowLeft size={24} color="#58af9b" />
          </button>
        ): (
          <button style={{opacity:0}}></button>
        )}
        {team ? (
          <Link to="/team" className="nav-btn">
            <span>TIME</span>
          </Link>
        ) : (
            <button style={{ opacity: 0 }}></button>
          )}
        {auth ? (
          <Link to="/auth" className="nav-btn">
            <span>INSCREVER-SE</span>
          </Link>
        ): (
          <button style={{ opacity: 0}}></button>
        )}
      </nav>
    </div>
  );
}

export default Topbar;