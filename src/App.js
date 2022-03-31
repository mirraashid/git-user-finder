import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Home from './components/pages/Home';

const App = () => {
  return (
    <AlertState>
      <GithubState>
            <div className="App">
              <Navbar />
              <div className="container">
                <Alert />
                <Home />
              </div>
            </div>
      </GithubState>
    </AlertState>
  );
};

export default App;
