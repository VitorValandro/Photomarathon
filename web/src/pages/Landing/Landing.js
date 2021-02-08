import React, { useEffect, useState } from 'react';

import Topbar from '../../components/Topbar/Topbar';
import Photo from '../../components/Photo/Photo';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';

import '../../global/global.css';
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
      <Topbar goBackArrow={false} />
      <div className="landingContent">
        <div className="rollScreenContainer">
          <main className="rollScreenContainer">
            {isAuthenticated() ? (
              <PhotoUpload />
            ) : (<span></span>)
            }
          </main>
          {photosArray.length !== 0 ? (
            photosArray.map(photo => {
              return (
                <Photo key={photo.id} photo={photo} />
              )
            })
          ) : (<div className="nullAlert">Ainda não há fotos para mostrar</div>)
          }
        </div>
      </div>
    </main>
  );
}

export default Landing;