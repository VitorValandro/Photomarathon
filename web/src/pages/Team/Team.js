import React, { useState } from 'react';

import Topbar from '../../components/Topbar/Topbar';
import Photo from '../../components/Photo/Photo';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';

import { FiUser, FiPlus, FiArrowRight } from 'react-icons/fi';

import './Team.css';

function Team() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberRegister, setMemberRegister] = useState('');

  return (
    <main>
      <Topbar goBackArrow={true} auth={false} team={false} />
      <div className="teamContent">
        <div className="teamInfoContainer">
          <div className="infoContainer">
            <span className="teamName">Nome do time</span>
            <span className="memberPresentation">Membros</span>
            <ul className="teamMembers">
              <li className="memberInfo">
                <div>
                  <FiUser size={24} color='#58af9b'/>
                  <span className="memberName">Vitor Matheus Valandro da Rosa</span>
                </div>
                
                <span className="memberRegister">2019307490</span>
              </li>
              <li className="memberInfo">
                <div>
                  <FiUser size={24} color='#58af9b' />
                  <span className="memberName">Vitor Matheus Valandro da Rosa da Silva Pinto</span>
                </div>
                <span className="memberRegister">2019307490</span>
              </li>
            </ul>
          </div>
          <div className="btnDiv">
            {!showAddMember ? (
              <button className="addMemberBtn" onClick={() => {setShowAddMember(true)}}><FiPlus size={24} color='#58af9b' /></button>
            ) : (
              <form onSubmit={()=>{}} className="addMemberForm">
                <span>Insira os dados para inscrever um novo membro</span>
                <fieldset>
                  <div className="addMemberInputBlock">
                    <label htmlFor="name">Nome</label>
                    <input 
                      value={memberName}
                      type="text"
                      onChange={e => {setMemberName(e.target.value)}}
                      pattern="[A-Za-z]"
                      required
                    />
                  </div>
                  <div className="addMemberInputBlock">
                    <label htmlFor="registration">Matrícula</label>
                    <input 
                      value={memberRegister} 
                      onChange={e => { setMemberRegister(e.target.value) }} 
                      maxLength="10"
                      required
                    />
                  </div>
                </fieldset>
                <button type="submit" className="addMemberBtn" style={{border:'2px dashed #ececec', marginTop:'10px'}}>
                    <FiArrowRight size={24} color='#58af9b'/>
                </button>
              </form>
            )}
            
          </div>
        </div>
        <div style={{alignItems: 'center'}}>
          <div className="teamPhotosContainer">
            <PhotoUpload />
            <Photo href="https://ricardohage.com.br/wp-content/uploads/2019/04/fotografia-profissional_0001_paisagem.jpg" />
            <Photo href="https://thumbs.dreamstime.com/b/paisagem-vertical-no-por-do-sol-63763253.jpg" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Team;