import React from "react";
import {Link} from "react-router-dom";
import './LandingPage.css';


export default function LandingPage(){
    return(
    <div className="landing">
        <div className="conteinerLanding">
        <h1 className="title">Henry Food</h1>
        <h2 className="subtitle">The best place to start cooking</h2>
        <Link to ="/home">
        <button className="button">Let's Go!</button>
        </Link>
        </div>
    </div>
)}