import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { getServerDetails } from "../../store/servers";
import splash_3 from '../../Images/discord-splash-3.png';
import fun from '../../Images/fun.png'
import chaty from '../../Images/chaty.png'
import games from '../../Images/games.png'
// import ideas from '../../Images/games.png'
import exlamation from '../../Images/exlamation.png'
import calender from '../../Images/calender.png'
import "./onePage.css";


function OnePageServer() {
  // const servers = useSelector((state) => state.servers.servers);
  const oneServer = useSelector(state => state.servers.oneServer);
  console.log("ONE PAGE SERVERS STATE", oneServer);
  const dispatch = useDispatch();
  let { serverId } = useParams();


  useEffect(() => {
    // dispatch(getAllServers());
    dispatch(getServerDetails(+serverId))
  }, [dispatch, serverId]);

  console.log('ONE SERVER', oneServer)

  if (!oneServer) return null
  else
    return (
      <>
        {/* NOTE upper (blue) div with pic and links */}
        <div id="upper">
          <div id="header-links">
            <NavLink id="links" to="/discover">
              Discover
            </NavLink>

            <NavLink id="links" to="/safety">
              Safety
            </NavLink>
          </div>
          <img id="upper-img" src={oneServer.preview_image} alt='upper-img' />
        </div>
        {/* NOTE lower part white */}
        <div id="lower-div">
          <h1 id="bold-title">{oneServer.name}</h1>
          <div id="sub-title">{oneServer.num_member} members</div>

          <div id="content-container">
            <div id="in-with-img">
              <img id="bullatin-img" src={calender} alt='img' />
              <p>{oneServer.created_at}</p>
            </div>
            <div id="in-with-img">
              <img id="bullatin-img" src={fun} alt='img' />
              <p>Have fun discussions with other members.</p>
            </div>
            <div id="in-with-img">
              <img id="bullatin-img" src={games} alt='img' />
              <p>Meet new people to play the game with</p>
            </div>
            <div id="in-with-img">
              <img id="bullatin-img" src={exlamation} alt='img' />
              <p>Post your beautiful fanart and suggestions</p>
            </div>
            <div id="in-with-img">
              <img id="bullatin-img" src={chaty} alt='img' />
              <p>
                Find trades, raids, and many other game events going on to complete
                with friends.
              </p>
            </div>
          </div>
        </div>
        {/* NOTE lower part with pic and join button, reffer to css from splash page */}
        <div id="bold-title">About</div>
        <div id="text">{oneServer.description}</div>

        <div className="details-container">
          <div className="details-card">
            <img className="details-card-photo" src={splash_3} alt="img" />
            <div className="ddetails-card-text">
              <div className="sub-title">Where Hanging Out is Easy</div>
              <div className="sub-subtext">
                Grab a seat in a voice channel when youre free. Friends in your
                server can see youre around and instantly pop in to talk without
                having to call.
              </div>
            </div>
            <NavLink className="details-card-bttn" to="/sign-up">
              <div>Join Q-Core</div>
            </NavLink>
          </div>
        </div>

        {/* FIXME we need to implament the righ url for joining a server */}
        <div id="footer-div">
          <NavLink id="footer" to={`/servers/${serverId}`}>
            <div id="in-footer">Join Server</div>
          </NavLink>
        </div>
      </>
    );



}

export default OnePageServer
