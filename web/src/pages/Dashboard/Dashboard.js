import React, { useEffect, useState } from 'react';
import { FiX, FiUsers, FiImage, FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Topbar from '../../components/Topbar/Topbar';

import './Dashboard.css';
import api from '../../services/api';

function Dashboard() {
  const [dropDownFlag, setDropDownFlag] = useState(true);
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [updateScreen, setUpdateScreen] = useState(0);
  const [themesInfo, setThemesInfo] = useState([]);

  useEffect(() => {
    getTeamInfo();
    getThemeInfo();
  }, [updateScreen]);

  async function getTeamInfo(){
    await api.get('/teamsinfo')
      .then((response) => {
        setTeamsInfo(response.data);
      })
      .catch(err => console.log(err));
  }

  async function deleteTeam(teamId){
    let sureAboutDelete = window.confirm("Tem certeza que quer excluir esse grupo, seus membros e todas as suas fotos? \n\nEssa é uma ação irreversível.");
    if(sureAboutDelete){
      await api.delete(`/teams/${teamId}`)
        .then((response) => {
          alert('Time excluído com sucesso.');
          setUpdateScreen(teamId);
        })
        .catch(err => console.log(err));
      return;
    }
    else {
      return;
    }
  }

  async function getThemeInfo(){
    await api.get('/themes')
      .then((response) => {
        setThemesInfo(response.data);
      })
      .catch(err => console.log(err));
  }

  async function deleteSubtheme(subthemeId){
    let sureAboutDelete = window.confirm("Tem certeza que quer excluir esse subtema e todas as fotos relacionadas à ele? \n\nEssa é uma ação irreversível.");
    if (sureAboutDelete) {
      await api.delete(`/themes/subthemes/${subthemeId}`)
        .then((response) => {
          alert('Subtema excluído com sucesso.');
          setUpdateScreen(subthemeId);
        })
        .catch(err => console.log(err));
      return;
    }
    else {
      return;
    }
  }

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
          {themesInfo.length !== 0 ? (
            themesInfo.map(themeInfo => {
              return(
                <div key={themeInfo.id} className="themeControlInfo">
                  <span className="themeInfoTitle">{themeInfo.title}</span>
                  <span className="themeInfoDropIcon" onClick={handleDropDown}>
                    {dropDownFlag ? (
                      <FiChevronUp size={24} color={"rgb(139,139,139)"} />
                    ) : (
                      <FiChevronDown size={24} color={"rgb(139,139,139)"} />
                    )}
                  </span>
                  <ul className={`themeInfoList ${dropDownFlag ? 'dropDownOpen' : ''}`}>
                    {themeInfo.subthemes.length !== 0 ? (
                      themeInfo.subthemes.map((subtheme, index) => {
                        return (
                          <li key={subtheme.id} className="themeInfoItem">
                            <div className="themeInfoText">
                              <span>Subtema {index+1}</span> <span>{subtheme.title}</span>
                            </div>
                            <div className="themeInfoButtons">
                              <FiDownload size={24} color={"rgb(139,139,139)"} />
                              <MdRemoveCircle
                                onClick={() => { deleteSubtheme(subtheme.id); }}
                                size={24}
                                color="#e57878"
                                style={{ marginLeft: '5px', cursor: 'pointer' }}
                              />
                            </div>
                          </li> 
                        )
                      })
                      
                    ) : (
                      <div>Não há subtemas ainda</div>
                    )}
                    <button className="addThemeBtn" onClick={() => { }}>
                      <MdAddCircle size={24} color='#58af9b' />
                    </button>
                  </ul>
                </div>
              )
            })
            
          ) : (
            <div>Tem nada aqui não</div>
          )}
        </div>
        <div className="teamInfoControlContainer">
          {teamsInfo.length !== 0 ? (
            teamsInfo.map(teamInfo => {
              return(
                <div key={teamInfo.id} className="teamInfoControlBlock"> 
                  <Link to={`/team/${teamInfo.id}`} className="teamLink">
                    <span className="teamInfoControlTitle">{teamInfo.name}</span>
                  </Link>
                  <div>
                    <ul className="teamInfoControlStats">
                      <li title={"Número de membros inscritos no grupo"}><FiUsers size={20} color={"rgb(139,139,139)"} /><span>{teamInfo.members}</span></li>
                      <li title={"Número de imagens postadas"}><FiImage size={20} color={"rgb(139,139,139)"} /><span>{teamInfo.photos}</span></li>
                    </ul>
                  </div>
                  <button className="teamInfoControlDelete" onClick={() => {deleteTeam(teamInfo.id)}}>
                    <FiX strokeWidth={3} size={15} color={"#FFF"} />
                  </button>
                  <div className="teamInfoControlDownload">
                    <FiDownload size={20} color={"rgb(139,139,139)"} />
                  </div>
                </div>
              )
            })
          ) : (<div>Ola</div>)}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;