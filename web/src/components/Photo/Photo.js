import React from 'react';

import './Photo.css';

function Photo(){
  return(
    <div className="photoContainer">
      <div className="photoHeader">
        <button type="button" className="teamLink">
          Nome do time
        </button>
        <div>
          <span className="postHour">10:04 - 08/01/2021</span>
          <span className="themeName">Nome do subtema</span>
        </div>
      </div>
      <img className="photoImg" src="https://ricardohage.com.br/wp-content/uploads/2019/04/fotografia-profissional_0001_paisagem.jpg"></img>
    </div>
  );
}

export default Photo;