// import logo from './logo.svg';
// import './App.css';

import React from "react";
import Navbar from "./components/Navbar";
// import About from './components/About';
// import Footer from './pages/Footer';
// import How from './pages/How';
// import Landing from './pages/Landing';
import NoLaunch from "./pages/NoLaunch";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AlphaLaunch from "./pages/AlphaLaunch";



function App() {

  

  return (
    <div className="App">

      {/* <Navbar /> */}
      {/* <Router> */}
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="enterapp" element={<NoLaunch />} />
        </Routes>
        </Router> */}

        {/* <Home /> */}
        {/* <NoLaunch /> */}

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="enterapp" element={<NoLaunch />} />
            <Route path="alpha" element={<AlphaLaunch />} />
          </Routes>
        </Router>

        {/* </Router> */}
    </div>
  );
}

export default App;
