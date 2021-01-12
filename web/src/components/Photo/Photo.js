import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import './Photo.css';

function Photo({href}){
  const [modal, setModal] = useState('none');

  function handleModal(){
    modal === 'none' ? setModal('flex') : setModal('none');
  }
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
        <img className="photoImg" src={href} onClick={handleModal}></img>
        <div className="photoModal" style={{display:modal}}>
          <FiX size={40} color={"#FFF"} className="closeModal" onClick={handleModal}/>
          <div>
            <button type="button" className="teamLink">
              Nome do time
            </button>
            <span className="themeName">Nome do subtema</span>
          </div>
          <img className="modalImg" src={href}></img>
          <span className="modalPostHour">10:04 - 08/01/2021</span>
        </div>
      </div>
  );
}

export default Photo;