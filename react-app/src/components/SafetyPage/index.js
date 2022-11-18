import React from "react";
import { NavLink } from 'react-router-dom'
import hummer from '../../Images/safety-hummer.jpeg'
import yellow from '../../Images/safety-yellow.jpeg'
import teens from '../../Images/safety-teens.jpeg'
import shield from '../../Images/safety-shield.jpeg'
import tools from '../../Images/safety-tools.jpeg'
import bigShield from '../../Images/big-shield.jpeg'
import './safety.css'



function Safety() {

  return (
    <>
      <div id="s-upper">
        <div id="h1"> DISCORD SAFETY CENTER</div>
        <div id="h2">what is Q-cord?</div>
        <div id="big-pic">
          <img id="big-pic" src={bigShield} alt="" />
        </div>
        <p id="safety-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div id="h2">Q-cord commitment to a safe and trusted experience</div>
        <p id="safety-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div id="middle">
        <div id="general">
          <div id="left">
            <div id="left-title">SAFETY</div>
            <img src={tools} alt="" />
            <div id="left-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </div>
          </div>
          <div id="right">
            <div id="a">
              <img id="safety-img" src={hummer} alt="" />
              <div id="blue-title">reprehenderit in voluptate</div>
              <div id="black-title">Excepteur sint occaecat</div>
            </div>
            <div id="b">
              <img id="safety-img" src={shield} alt="" />
              <div id="blue-title">voluptate velit esse </div>
              <div id="black-title"> mollit anim id est</div>
            </div>
            <div id="c">
              <img id="safety-img" src={teens} alt="" />
              <div id="blue-title">cupidatat non proident</div>
              <div id="black-title">voluptate velit esse </div>
            </div>

            <div id="d">
              <img id="safety-img" src={yellow} alt="" />
              <div id="blue-title">ipsum dolor sit amet</div>
              <div id="black-title">quis nostrud exercitation</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Safety
