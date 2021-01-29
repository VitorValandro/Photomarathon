import React, { useState } from "react";

import "./AuthScreen.css";

import { FiUsers, FiMail, FiLock } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import Topbar from "../../components/Topbar/Topbar";
import api from '../../services/api';
import { login } from '../../services/auth';


function AuthScreen(){
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [SubmitValidationMsg, setSubmitValidationMsg] = useState('');
  const [LoginValidationMsg, setLoginValidationMsg] = useState('');

  const history = useHistory();

  function handleTeamLogin(event){
    event.preventDefault();

    api.post(`/teams/login`, {
      "email": email,
      "password": password
    })
      .then((response) => {
        setLoginValidationMsg('Login realizado com sucesso!');
        login(response.data.token, response.data.team.id);
        history.push('/');
      })
      .catch((err) => {
        if (err.response.data){
          const { error } = err.response.data
          setLoginValidationMsg(error);
        }
        else{
          setLoginValidationMsg('Um erro ocorreu ao registrar o time');
        }
      });
  }

  function handleTeamSubmit(event){
    event.preventDefault();
    const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ']+$/;

    if (!nameRegex.test(teamName)) {
      setSubmitValidationMsg('O nome não deve conter números, caracteres especiais ou espaços em branco');
      return;
    }

    api.post(`/teams`, {
      "name":teamName,
      "email":email,
      "password":password
      })
      .then((response) => {
        setSubmitValidationMsg('Time inscrito com sucesso!');
        login(response.data.token, response.data.team.id);
        history.push('/');
      })
      .catch((err) => { 
        setSubmitValidationMsg('Um erro ocorreu ao registrar o time')
        console.log(err); 
      });
  }

  function formTransition(){
    const body = document.querySelector("body");
    body.className = body.className === "sign-in-js" ? "sign-up-js" : "sign-in-js";
  }

  return(
    <main>
      <Topbar />
      <div className='container-show'>
        <div className='content first-content'>
          <div className="first-column">
            <h2 className="title title-primary">Já inscreveu seu time?</h2>
            <p className="description description-primary">para entrar na sua conta</p>
            <p className="description description-primary">por favor faça login com seus dados</p>
            <button id="signinTransitionBtn" className="btn" onClick={formTransition}>Entrar</button>
          </div>    
          <div className='second-column'>
            <h2 className="title title-second">Inscreva um novo grupo</h2>
            <p className="description description-second">use seu email para cadastrar</p>
            <p className="description description-second">você pode inscrever os membros do seu grupo depois</p>
            <form className="form" onSubmit={handleTeamSubmit}>
              <label className="label-input" htmlFor="teamName">
                <FiUsers size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
                <input 
                  type="text"
                  placeholder="Nome do grupo"
                  onChange={e => { setTeamName(e.target.value) }}
                  required
                />
              </label>

              <label className="label-input" htmlFor="email">
                <FiMail size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
                <input 
                  type="email" 
                  placeholder="Email do líder"
                  onChange={e => { setEmail(e.target.value) }}
                  required
                />
              </label>

              <label className="label-input" htmlFor="password">
                <FiLock size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
                <input 
                  type="password" 
                  placeholder="Senha" 
                  onChange={e => { setPassword(e.target.value) }}
                  required
                />
              </label>

              <span className="validationMsgSpan">{SubmitValidationMsg}</span>

              <button className="btn">Registrar</button>        
            </form>
          </div> {/* end second-column */}
        </div> {/* end first-content */}
        
        <div className="content second-content">
          <div className="first-column">
            <h2 className="title title-primary">Ainda não inscreveu seu grupo?</h2>
            <p className="description description-primary">preencha o formulário e registre seu time!</p>
            <button id="signupTransitionBtn" className="btn" onClick={formTransition}>Inscrever-se</button>
          </div> {/* end first-column */}
          <div className="second-column">
            <h2 className="title title-second">Entre na conta do seu grupo</h2>
            <p className="description description-second">Insira as informações de seu time</p>
            <form className="form" onSubmit={handleTeamLogin}>
              <label className="label-input" htmlFor="loginMail">
                <FiMail size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
                <input 
                  type="email" 
                  placeholder="Email"
                  onChange={e => { setEmail(e.target.value) }}
                  required
                />
              </label>

              <label className="label-input" htmlFor="loginPass">
                <FiLock size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
                <input 
                  type="password" 
                  placeholder="Senha" 
                  onChange={e => { setPassword(e.target.value) }}
                  required
                />
              </label>

              <span className="validationMsgSpan">{LoginValidationMsg}</span>
              
              <button className="btn">Entrar</button>
              </form>
          </div> {/* end second-column */}
        </div> {/* end second-content */}
      </div>
    </main>
  );
}

export default AuthScreen;