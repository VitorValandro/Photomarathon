import React, { useEffect, useState } from 'react';

import Topbar from '../../components/Topbar/Topbar';
import Photo from '../../components/Photo/Photo';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';

import { FiUser, FiPlus, FiArrowRight } from 'react-icons/fi';
import { MdRemoveCircle } from 'react-icons/md';

import './Team.css';
import api from '../../services/api';
import { getTeamThatIsAuthenticated, isAuthenticated } from "../../services/auth";
import { useParams } from 'react-router-dom';

function Team() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberRegister, setMemberRegister] = useState('');
  const [validationMsg, setValidationMsg] = useState('');
  const [membersArray, setMembersArray] = useState([]);
  const [photosArray, setPhotosArray] = useState([]);
  const [teamInfo, setTeamInfo] = useState({});

  const { teamId } = useParams();

  useEffect(() => {
    getMembersList();
  }, [validationMsg]);

  useEffect(() => {
    getTeamPhotos();
    getTeamInfo();
    getMembersList();
  }, [teamId]);

  async function getMembersList(){
    await api.get(`/teams/${teamId}/members`)
      .then((response) => {
        setMembersArray(response.data);
      })
      .catch(err => console.log(err));
  }

  async function getTeamInfo(){
    await api.get(`/teams/${teamId}`)
      .then((response) => {
        setTeamInfo(response.data);
      })
      .catch(err => console.log(err));
  }

  async function handleMemberDelete(member){
    await api.delete(`teams/${teamId}/members/${member.id}`)
      .then(response => {
        setValidationMsg('Success'); // essa atribuição é necessária para a tela reagir à mudança
        setValidationMsg(''); // desatribui pra voltar ao normal
      })
      .catch(err => {console.log(err)});
  }

  async function getTeamPhotos() {
    await api.get(`/photos/teams/${teamId}`)
      .then((response) => {
        setPhotosArray(response.data);
      })
      .catch(err => console.log(err))
  } 

  function handleMemberSubmit(event){
    event.preventDefault();
    const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;
    const registerRegex = /^\d+$/;

    if(!nameRegex.test(memberName) || !memberName.trim()){
      setValidationMsg('O nome não deve conter números ou caracteres especiais (além do espaço)')
      return;
    }

    if(!registerRegex.test(memberRegister)){
      setValidationMsg('A matrícula deve ser composta apenas por números')
      return;
    }

    api.post(`/teams/${teamId}/members`, { 
        'name':memberName, 
        'registration':memberRegister 
      })
      .then((response) => {
        setValidationMsg('Membro inscrito com sucesso!');
      })
      .catch((err) => {
        setValidationMsg('Um erro ocorreu ao inscrever membro')
        console.log(err);
      })

    setValidationMsg('');
  }

  return (
    <main>
      <Topbar goBackArrow={true} />
      <div className="teamContent">
        <div className="teamInfoContainer">
          <div className="infoContainer">
            <span className="teamName">{teamInfo.name}</span>
            <span className="memberPresentation">Membros</span>
            <ul className="teamMembers">
              {membersArray.length !== 0 ? (
                membersArray.map(member => {
                  return(
                    <li key={member.id} className="memberInfo">
                      <div>
                        <FiUser size={24} color='#58af9b' />
                        <span className="memberName">{member.name}</span>
                      </div>
                      <div>
                        <span className="memberRegister">{member.registration}</span>
                        {(isAuthenticated() && teamId === getTeamThatIsAuthenticated()) ? (
                          <MdRemoveCircle 
                            onClick={() => {handleMemberDelete(member)}} 
                            size={24} 
                            color="#e57878" 
                            style={{marginLeft:'5px', cursor:'pointer'}}
                          />
                        ): (<span></span>)}
                      </div>
                    </li>   
                  );
                })
              ) : (
                <li className="memberPresentation memberInfo">
                  Esse time ainda não tem membros
                </li>
              )}
            </ul>
          </div>
          {(isAuthenticated() && teamId === getTeamThatIsAuthenticated()) ? (
            <div className="btnDiv">
              {!showAddMember ? (
                <button className="addMemberBtn" onClick={() => {setShowAddMember(true)}}><FiPlus size={24} color='#58af9b' /></button>
              ) : (
                <form onSubmit={handleMemberSubmit} className="addMemberForm">
                  <span>Insira os dados para inscrever um novo membro</span>
                  <fieldset>
                    <div className="addMemberInputBlock">
                      <label htmlFor="name">Nome</label>
                      <input 
                        value={memberName}
                        type="text"
                        onChange={e => {setMemberName(e.target.value)}}
                        required
                      />
                    </div>
                    <div className="addMemberInputBlock">
                      <label htmlFor="registration">Matrícula</label>
                      <input 
                        value={memberRegister} 
                        onChange={e => { setMemberRegister(e.target.value) }} 
                        minLength="10"
                        maxLength="10"
                        required
                      />
                    </div>
                  </fieldset>
                  {validationMsg !== '' ? (
                      <div className="validationContainer">
                        <p className="validationMessage">{validationMsg}</p>
                      </div>
                  ) : (
                    <span></span>
                  )
                  }
                  <button type="submit" className="addMemberBtn" style={{border:'2px dashed #ececec', marginTop:'10px'}}>
                      <FiArrowRight size={24} color='#58af9b'/>
                  </button>
                </form>
              )}   
            </div>
            ) : (<span></span>)
          }
        </div>
        <div style={{alignItems: 'center'}}>
          <div className="teamPhotosContainer">
            {(isAuthenticated() && teamId === getTeamThatIsAuthenticated()) ? (
              <PhotoUpload />
              ): (<span></span>)
            }
            {photosArray.map((photo => {
              return (
                <Photo key={photo.id} photo={photo} />
              )
            }))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Team;