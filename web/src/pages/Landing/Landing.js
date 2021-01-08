import React from 'react';

import Topbar from '../../components/Topbar/Topbar';
import Photo from '../../components/Photo/Photo';
import './Landing.css';

function Landing() {
  return (
    <main>
      <Topbar goBackArrow={false} auth={true}/>
      <div className="rollScreenContainer">
        <Photo />
      </div>
    </main>
  );
}

export default Landing;
