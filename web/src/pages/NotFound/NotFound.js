import React from 'react';
import Topbar from '../../components/Topbar/Topbar';

import './NotFound.css';

function NotFound(){
  return(
    <main>
      <Topbar />
      <div className="notFoundContainer">
        <span>404</span>
      </div>
    </main>
  )
}

export default NotFound;