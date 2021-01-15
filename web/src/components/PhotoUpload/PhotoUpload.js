import React, { useEffect, useState } from "react";

import Dropzone from 'react-dropzone';
import filesize from 'filesize';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { MdCheckCircle, MdError } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';

import "./PhotoUpload.css";

import api from '../../services/api';

function PhotoUpload() {
  const [uploadedFile, setUploadedFile] = useState('');
  const [options, setOptions] = useState([]);
  const [subtheme, setSubtheme] = useState(0);

  useEffect(() => {
    loadSubthemes(2)
  }, []);

  async function loadSubthemes(themeId){
    let data;
    let options = [];
    await api.get(`/themes/${themeId}/subthemes`)
      .then((response) => {
        data = response.data;
      })
      .catch((err) => {
        console.log(err);
      })
    data.forEach((subtheme) => {
      options.push(
        { value: subtheme.id, label: subtheme.title }
      )
    });
    setOptions(options);
  }

  function processUpload(file, subtheme) {
    const data = new FormData();

    data.append('subthemeId', subtheme);
    data.append('file', file.file);

    api.post('/teams/2/photos', data, {
      onUploadProgress: e => {

        const progress = parseInt(Math.round((e.loaded * 100) / e.total)) // regra de três

        setUploadedFile({ ...uploadedFile, progress: progress });
      }
    }).then((response) => {
      setUploadedFile({ ...uploadedFile, uploaded: true });
      setInterval(() => {
        window.location.reload();
      }, 1000);
      
    }).catch((err) => {
      setUploadedFile({ ...uploadedFile, error: true });
      console.log(err);
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
        <select className={'themeSelect'} defaultValue={0}onChange={(e) => {setSubtheme(e.target.value); console.log(subtheme)}}>
          <option value={0} disabled>Selecione o subtema</option>
          {options.map(option => {
            return (
              <option className={'selectOption'} key={option.value} value={option.value}>{option.label}</option>
          )}) }
        </select>
        { !!uploadedFile.name && (
          <div className="fileContainer">
            <li>
              <div className="fileInfo">
                <div className="filePreview" style={{ backgroundImage: `url(${uploadedFile.preview})` }} />
                <div>
                  <strong>{uploadedFile.name}</strong>
                  <span>{uploadedFile.readableSize}
                  {!uploadedFile.uploaded && (
                    <button onClick={() => { setUploadedFile({}) }}>Excluir</button>
                  )}
                  </span>
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
              {!uploadedFile.uploaded && subtheme !== 0 &&(
                <button className="uploadButton" onClick={() => { processUpload(uploadedFile, subtheme); }}>
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
  );
}

export default PhotoUpload;