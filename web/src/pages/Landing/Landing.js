import React, { useEffect, useState } from 'react';

import Topbar from '../../components/Topbar/Topbar';
import Photo from '../../components/Photo/Photo';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';

import './Landing.css';
import api from '../../services/api';
import { isAuthenticated } from "../../services/auth";

function Landing() {
  const [photosArray, setPhotosArray] = useState([]);

  useEffect(() => { getAllPhotos() }, [])

  async function getAllPhotos(){
    await api.get(`/photos`)
      .then((response) => {
        setPhotosArray(response.data);
      })
      .catch(err => console.log(err))
  } 

  return (
    <main>
      <Topbar goBackArrow={false} auth={true} team={true}/>
      <div className="landingContent">
        <div className="rollScreenContainer">
          <main className="rollScreenContainer">
            {isAuthenticated() ? (
              <PhotoUpload />
            ) : (<span></span>)
            }
          </main>
          {photosArray.map((photo => {
            return(
              <Photo key={photo.id} photo={photo}/>
            )
          }))}
        </div>
      </div>
    </main>
  );
}

export default Landing;