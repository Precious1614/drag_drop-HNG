import React from "react";
import { Link } from "react-router-dom";
import Hero from "../images/hero.webp";

const Home = () => {
  return (
    <header className="body-cont">
      <div className="container header__container">
        <div className="header__left">
          <h1>BOOST YOUR STYLE SENSE </h1>
          <p>Don't Compromise on your style! get flat 2-% off for summer </p>
          <div className="btn__cont ">
            <Link className="btn btn-primary">Register</Link>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
        <div className="header__right">
          <div className="header__right-image">
            <img src={Hero} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
