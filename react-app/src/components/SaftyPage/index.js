import React from "react";
import {NavLink} from 'react-router-dom'

function Safety() {

    return (
      <>
        <div id="upper">
          <div id="header-links">
            <NavLink id="links" to="/discover">
              Discover
            </NavLink>

            <NavLink id="links" to="/login">
              Q-cord
            </NavLink>
          </div>
          <h1> DISCORD SAFETY CENTER</h1>
          <h2>what is Q-cord</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2>Q-cord commitment to a safe and trusted experience</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div id="middle">
          <div id="general">
            <div id="left"></div>
            <div id="right">
              <div>
                <img />
                <div id='blue-title'></div>
                <div id='black-title'></div>
              </div>
              <div>
                 <img />
                <div id='blue-title'></div>
                <div id='black-title'></div>
              </div>
              <div>
                 <img />
                <div id='blue-title'></div>
                <div id='black-title'></div>
              </div>
              
              <div>
                 <img />
                <div id='blue-title'></div>
                <div id='black-title'></div>
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
}

export default Safety