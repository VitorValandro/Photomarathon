import React from "react";

import "./AuthScreen.css";

import { FiUsers, FiMail, FiLock } from "react-icons/fi";

function AuthScreen(){

  function formTransition(){
    const body = document.querySelector("body");
    body.className = body.className === "sign-in-js" ? "sign-up-js" : "sign-in-js";
  }

  return(
    <div className='container'>
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
          <form className="form">
            <label className="label-input" htmlFor="">
              <FiUsers size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
              <input type="text" placeholder="Nome do grupo" />
            </label>

            <label className="label-input" htmlFor="">
              <FiMail size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
              <input type="email" placeholder="Email do líder" />
            </label>

            <label className="label-input" htmlFor="">
              <FiLock size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
              <input type="password" placeholder="Senha" />
            </label>

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
          <form className="form">
            <label className="label-input" htmlFor="">
              <FiMail size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
              <input type="email" placeholder="Email" />
            </label>

            <label className="label-input" htmlFor="">
              <FiLock size={30} style={{ marginLeft: 10 }} color="#7f8c8d" />
              <input type="password" placeholder="Senha" />
            </label>
            
            <button className="btn">Entrar</button>
            </form>
        </div> {/* end second-column */}
      </div> {/* end second-content */}
    </div>
  );
}

export default AuthScreen;