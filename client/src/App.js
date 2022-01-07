import React from "react";
import './App.css';
import './Style.css';

import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';

import Home from './components/pages/Home';
import CandidatePage from './components/pages/CandidatePage';
import CandidateDetails from './components/pages/CandidateDetails';
import ProfileCandidate from './components/pages/ProfileCandidate';

import DeleteAccount from './components/bridge/DeleteAccount';
import EditCandidateInfo from './components/bridge/EditCandidateInfo';
//import Submit from './components/Submit';

function App() {
  return (
    <div className="backgroundIMG">
      <Navbar></Navbar>
      <EditCandidateInfo></EditCandidateInfo>
      <Footer></Footer>
    </div>
  );
}

export default App;
