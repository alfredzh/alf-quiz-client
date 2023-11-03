import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Miners from "./views/miners/Miners";
import Asteroids from "./views/asteroids/Asteroids";
import Planets from "./views/planets/Planets";

import backendMinerImage from './assets/images/backend-miner.svg'
import Nav from "./views/nav/Nav";

function App() {
  return (
    <div className="app">
      <div className="main">
        <div className="logo">
          <img src={backendMinerImage} />
        </div>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/miners" element={<Miners />} />
            <Route path="/asteroids" element={<Asteroids />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="*" element={<Navigate replace to="/miners" />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="side">
        <h2 className="years">- Years</h2>
        <div className="side-bg"></div>
      </div>
    </div>
  );
}

export default App;
