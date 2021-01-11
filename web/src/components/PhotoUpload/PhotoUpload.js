import React, { useState } from "react";

import Dropzone from 'react-dropzone';
import filesize from 'filesize';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';

import "./PhotoUpload.css";

import api from '../../services/api';

function PhotoUpload() {
  const [uploadedFile, setUploadedFile] = useState('');

  function processUpload(file) {
    const data = new FormData();

    data.append('subthemeId', 2);
    data.append('file', file.file);

    api.post('/teams/2/photos', data, {
      onUploadProgress: e => {

        const progress = parseInt(Math.round((e.loaded * 100) / e.total)) // regra de três

        setUploadedFile({ ...uploadedFile, progress: progress });
      }
    }).then((response) => {
      setUploadedFile({ ...uploadedFile, uploaded: true });
    }).catch(() => {
      setUploadedFile({ ...uploadedFile, error: true });
    })
  }

  function handleUpload(files){
    setUploadedFile({});
    const file = files[0];
    
    const fileProps = {
      file,
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false
    }
    
    setUploadedFile(fileProps);
    
  };

  function renderDragMessage(isDragActive, isDragReject){
    if(!isDragActive){
      return <p className="uploadMessage">Arraste arquivos aqui ou clique para selecionar</p>
    }

    if(isDragReject){
      return <p className="uploadMessage uploadError">Arquivo não suportado</p>
    }

    return <p className="uploadMessage uploadSuccess">Solte os arquivos aqui</p>
  };

  return (
    <main className="rollScreenContainer">
      <div className="uploadContainer">
        <Dropzone accept="image/*" onDropAccepted={handleUpload} multiple={false}>
          { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <div
              { ...getRootProps() }
              className={`dropzone ${isDragReject ? 'dragReject' : ''} ${isDragActive ? 'dragActive' : ''}`}
            >
              <input { ...getInputProps() }/>
              {renderDragMessage(isDragActive, isDragReject)}
            </div>
          ) }
        </Dropzone>
        { !!uploadedFile.name && (
          <div className="fileContainer">
            <li>
              <div className="fileInfo">
                <div className="filePreview" style={{ backgroundImage: `url(${uploadedFile.preview})` }} />
                <div>
                  <strong>{uploadedFile.name}</strong>
                  <span>{uploadedFile.readableSize}<button onClick={() => { setUploadedFile({}) }}>Excluir</button></span>
                </div>
              </div>
              <div>
                {!uploadedFile.uploaded && !uploadedFile.error && (
                  <CircularProgressbar
                    styles={{
                      root: { width: 24 },
                      path: { stroke: '#7159c1' }
                    }}
                    strokeWidth={10}
                    value={uploadedFile.progress}
                  />
                )}
                { uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                { uploadedFile.error && <MdError size={24} color="#e57878" /> }
                
              </div>
            </li>
            <div className="bottomDiv">
              {!uploadedFile.uploaded &&(
                <button className="uploadButton" onClick={() => { processUpload(uploadedFile); }}>
                  <FiUpload size={24} color={"#999"}/>
                </button>
              )}
              {uploadedFile.uploaded &&(
                <span className="statusMessage">Arquivo enviado com sucesso!</span>
              )}
            </div>
          </div>
        ) }
      </div> 
    </main>
  );
}

export default PhotoUpload;