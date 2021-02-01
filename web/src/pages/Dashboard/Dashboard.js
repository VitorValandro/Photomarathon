import React from 'react';
import { FiX, FiUsers, FiImage } from 'react-icons/fi';

import Topbar from '../../components/Topbar/Topbar';

import './Dashboard.css';
import api from '../../services/api';

function Dashboard() {

  return (
    <main>
      <Topbar />
      <div className="dashboardContainer">
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;