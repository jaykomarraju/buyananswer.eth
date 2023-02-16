import react from "react";
import About from "../components/About";
import How from "../components/How";
import Landing from "../components/Landing";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import About2 from "../components/About2";



const Home = () => {



  return (
    <div>
    {/* <Navbar /> */}
      <Landing />
      
      <About2 />
      <About />
      <How />
      <Footer />
    </div>
  );
};

export default Home;
