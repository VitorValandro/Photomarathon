import React, { useState } from "react";

import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { MdCollections, MdGroup } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { isAuthenticated, logout, getTeamThatIsAuthenticated } from "../../services/auth";

import '../../global/global.css';
import "./Topbar.css";
import colors from "../../global/global";

function Topbar({ goBackArrow=true, page='Landing' }) {
  const history = useHistory();
  
  function handleLogOut(){  
    logout();
    history.push('/');
  }
  
  return(
    <main>
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
            )
          }
        </nav>
      </div>
      <div className="bottomBarContainer">
        {(!isAuthenticated()) ? (
          <Link to="/auth" className="bottomBarCenterItem">
            <span>INSCREVER-SE</span>
          </Link>
        ) : (
            null
          )}
        {(isAuthenticated()) && page !== 'Auth' ? (
          <Link 
            to="/" 
            className={`bottomBarLeftItem ${page === 'Landing' ? 'bottomBarItemOnFocus' : ''}`}
          >
            <MdCollections size={30} color={colors.neutralGreen} />
          </Link>
          ) : (null)
        }
        {(isAuthenticated()) && page !== 'Auth' ? (
          <Link 
            to={`/team/${getTeamThatIsAuthenticated()}`} 
            className={`bottomBarRightItem ${page === 'Team' ? 'bottomBarItemOnFocus' : ''}`}
          >
            <MdGroup size={30} color={colors.neutralGreen} />
          </Link>
          ) : (null)
        }
        {page === 'Auth' ? (
          <Link to="/" className="bottomBarCenterItem">
            <FiArrowLeft size={24} color="#58af9b" />
          </Link>
        ) : (null)
        }
      </div>
    </main>
  );
}

export default Topbar;