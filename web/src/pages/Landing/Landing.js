import React from 'react';

import Topbar from '../../components/Topbar/Topbar';
import Photo from '../../components/Photo/Photo';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';

import './Landing.css';

function Landing() {
  return (
    <main>
      <Topbar goBackArrow={false} auth={true} team={true}/>
      <div className="landingContent">
        <div className="rollScreenContainer">
          <main className="rollScreenContainer">
            <PhotoUpload />
          </main>
          <Photo href="https://ricardohage.com.br/wp-content/uploads/2019/04/fotografia-profissional_0001_paisagem.jpg"/>
          <Photo href="https://thumbs.dreamstime.com/b/paisagem-vertical-no-por-do-sol-63763253.jpg" />
        </div>
      </div>
    </main>
  );
}

export default Landing;