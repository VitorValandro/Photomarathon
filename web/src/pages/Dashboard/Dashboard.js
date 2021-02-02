import React, { useState } from 'react';
import { FiX, FiUsers, FiImage, FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';

import Topbar from '../../components/Topbar/Topbar';

import './Dashboard.css';
import api from '../../services/api';

function Dashboard() {
  const [dropDownFlag, setDropDownFlag] = useState(true);
  function handleDropDown(){
    dropDownFlag ? setDropDownFlag(false) : setDropDownFlag(true);
  }

  return (
    <main>
      <Topbar />
      <div className="dashboardContainer">
        <div className="themeControlContainer">
          <div className="themeControlForm">
            
          </div>
          <div className="themeControlInfo">
            <span className="themeInfoTitle">Nome do tema</span>
            <span className="themeInfoDropIcon" onClick={handleDropDown}>
              {dropDownFlag ? (
                <FiChevronUp size={24} color={"rgb(139,139,139)"} />
              ) : (
                <FiChevronDown size={24} color={"rgb(139,139,139)"} />
              )}
              
            </span>
            <ul className={`themeInfoList ${dropDownFlag ? 'dropDownOpen' : ''}`}>
              <li className="themeInfoItem">
                <div className="themeInfoText">
                  <span>Subtema 1</span> <span>O som do silêncio</span>
                </div>
                <div className="themeInfoButtons">
                  <FiDownload size={24} color={"rgb(139,139,139)"} />
                  <MdRemoveCircle 
                    onClick={() => {}} 
                    size={24} 
                    color="#e57878" 
                    style={{marginLeft:'5px', cursor:'pointer'}}
                  />
                </div>
              </li>
              <li className="themeInfoItem">
                <div className="themeInfoText">
                  <span>Subtema 2</span> <span>Mais rápido que a luz</span>
                </div>
                <div className="themeInfoButtons">
                  <FiDownload size={24} color={"rgb(139,139,139)"} />
                  <MdRemoveCircle 
                    onClick={() => {}} 
                    size={24} 
                    color="#e57878" 
                    style={{marginLeft:'5px', cursor:'pointer'}}
                  />
                </div>
              </li>
              <li className="themeInfoItem">
                <div className="themeInfoText">
                  <span>Subtema 3</span> <span>O universo em expansão</span>
                </div>
                <div className="themeInfoButtons">
                  <FiDownload size={24} color={"rgb(139,139,139)"} />
                  <MdRemoveCircle 
                    onClick={() => {}} 
                    size={24} 
                    color="#e57878" 
                    style={{marginLeft:'5px', cursor:'pointer'}}
                  />
                </div>
              </li>
              <li className="themeInfoItem">
                <div className="themeInfoText">
                  <span>Subtema 4</span> <span>A água que flui na terra</span>
                </div>
                <div className="themeInfoButtons">
                  <FiDownload size={24} color={"rgb(139,139,139)"} />
                  <MdRemoveCircle 
                    onClick={() => {}} 
                    size={24} 
                    color="#e57878" 
                    style={{marginLeft:'5px', cursor:'pointer'}}
                  />
                </div>
              </li>
              <button className="addThemeBtn" onClick={() => { }}>
                <MdAddCircle size={24} color='#58af9b' />
              </button>
            </ul>
            
          </div>
        </div>
        <div className="teamInfoContainer">
          <div className="teamInfoBlock">
            <span className="teamInfoTitle">Nome do time</span>
            <div>
              <ul className="teamInfoStats">
                <li title={"Número de membros inscritos no grupo"}><FiUsers size={20} color={"rgb(139,139,139)"} /><span>0</span></li>
                <li title={"Número de imagens postadas"}><FiImage size={20} color={"rgb(139,139,139)"} /><span>0</span></li>
              </ul>
            </div>
            <button className="teamInfoDelete"><FiX strokeWidth={3} size={15} color={"#FFF"} /></button>
            <div className="teamInfoDownload">
              <FiDownload size={20} color={"rgb(139,139,139)"} />
            </div>
          </div>
          <div className="teamInfoBlock">
            <span className="teamInfoTitle">Nome do time</span>
            <div>
              <ul className="teamInfoStats">
                <li title={"Número de membros inscritos no grupo"}><FiUsers size={20} color={"rgb(139,139,139)"}/><span>0</span></li>
                <li title={"Número de imagens postadas"}><FiImage size={20} color={"rgb(139,139,139)"} /><span>0</span></li>
              </ul>
            </div>
            <button className="teamInfoDelete"><FiX strokeWidth={3} size={15} color={"#FFF"} /></button>
            <div title={"Fazer o download de todas as fotos do grupo"} className="teamInfoDownload">
              <FiDownload size={20} color={"rgb(139,139,139)"} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;