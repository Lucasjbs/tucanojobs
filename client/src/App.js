import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Style.css';

import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';

import Home from './components/pages/Home';
import CandidatePage from './components/pages/CandidatePage';
import CandidateDetails from './components/pages/CandidateDetails';
import ProfileCandidate from './components/pages/ProfileCandidate';
import Login from './components/pages/Login';
import Questions from './components/pages/Questions';
import TalktoUs from './components/pages/TalktoUs';
import AboutUs from './components/pages/AboutUs';

import RegisterCandidate from './components/bridge/RegisterCandidate';
import EditCandidateInfo from './components/bridge/EditCandidateInfo';
import DeleteAccount from './components/bridge/DeleteAccount';
import QueryLinked from './components/bridge/QueryLinked';

function App() {
  return (
    <div className="backgroundIMG">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/candidates' element={<CandidatePage/>} />
          <Route path='/candidate/details/:id' element={<CandidateDetails />} />
          <Route path='/candidate/profile' element={<ProfileCandidate />} />
          <Route path='/worker/register' element={<RegisterCandidate />}></Route>
          <Route path='/worker/login' element={<Login />}></Route>
          <Route path='/candidate/edit' element={<EditCandidateInfo />}></Route>
          <Route path='/candidate/delete' element={<DeleteAccount />}></Route>
          <Route path='/questions' element={<Questions />}></Route>
          <Route path='/talktous' element={<TalktoUs />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/candidate/searchby/:tag' element={<QueryLinked />} />
          <Route path='*' element={<Home/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
