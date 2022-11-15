import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useHistory, NavLink} from 'react-router-dom'
import { getAllServers } from "../../store/servers";
import splash_3 from '../../Images/discord-splash-3.png'

function OnePageServer() {
const servers = useSelector((state) => state.servers);
console.log("ONE PAGE SERVERS STATE", servers);
const dispatch = useDispatch();
let { serverId } = useParams();
const history = useHistory();

useEffect(() => {
  dispatch(getAllServers());
}, [dispatch]);
return (
  <>
    <div id="upper">
      <div id="server-title">{servers[serverId].preview_image}</div>
    </div>

    <div id="lower"></div>
    <div id="bold-title">{servers[serverId].name}</div>
    <div id="text">{servers[serverId].created_at}</div>
    <p>Have fun discussions with other members.</p>
    <p>Meet new people to play the game with.</p>
    <p>Post your beautiful fanart and suggestions.</p>
    <p>
      Find trades, raids, and many other game events going on to complete with
      friends.
    </p>

    <div id="bold-title">About</div>
    <div id="text">{servers[serverId].description}</div>

    <div className="Splash-detail even">
      <div className="row">
        <img id="splash3" src={splash_3} alt="" />
        <div className="description-left">
          <div className="sub-title">Where Hanging Out is Easy</div>
          <div className="sub-subtext">
            Grab a seat in a voice channel when youre free. Friends in your
            server can see youre around and instantly pop in to talk without
            having to call.
          </div>
        </div>
      </div>
    </div>
    <NavLink to="/sign-up">
      <div id="signup">Join Q-Core</div>
    </NavLink>
    {/* FIXME we need to implament the righ url for joining a server */}
    <NavLink to={`/servers/${serverId}`}>
    <div id="footer">Join Server</div>
    </NavLink>
  </>
);



}

export default OnePageServer
