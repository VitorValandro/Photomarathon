import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

import './Photo.css';
import api from '../../services/api';

const apiUrl = "http://localhost:3333";

function Photo({photo}){
  const [modal, setModal] = useState('none');
  const [subthemeName, setSubthemeName] = useState('');
  const [teamName, setTeamName] = useState('');

  useEffect(() => {getPhotoAssociationsInfo()}, []);

  async function getPhotoAssociationsInfo(){
    await api.get(`/themes/subthemes`)
      .then((response) => {
        const subthemeObject = response.data.filter((subtheme) => {
          return subtheme.id === photo.subthemeId;
        });
        setSubthemeName(subthemeObject[0].title);
      })
      .catch(err => console.log(err));
    
    await api.get(`/teams`)
      .then((response) => {
        const teamObject = response.data.filter((team) => {
          return team.id === photo.teamId;
        });
        setTeamName(teamObject[0].name);
      })
  }

  function handleModal(){
    modal === 'none' ? setModal('flex') : setModal('none');
  }

  function convertTimestampToDate(timestamp){
    const date = new Date(timestamp);
    const hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();

    return `${hours}:${minutes} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }

  return(
      <div className="photoContainer">
        <div className="photoHeader">
          <button type="button" className="teamLink">
            {teamName}
          </button>
          <div>
            <span className="postHour">{convertTimestampToDate(photo.createdAt)}</span>
            <span className="themeName">{subthemeName}</span>
          </div>
        </div>
        <img alt="Fotografia do time" className="photoImg" src={`${apiUrl}/uploadedPhotos/${photo.filename}`} onClick={handleModal}></img>
        <div className="photoModal" style={{display:modal}}>
          <FiX size={40} color={"#FFF"} className="closeModal" onClick={handleModal}/>
          <div>
            <button type="button" className="teamLink">
              {teamName}
            </button>
            <span className="themeName">{subthemeName}</span>
          </div>
          <img alt="Fotografia do time" className="modalImg" src={`${apiUrl}/uploadedPhotos/${photo.filename}`}></img>
          <span className="modalPostHour">{convertTimestampToDate(photo.createdAt)}</span>
        </div>
      </div>
  );
}

export default Photo;