import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getAllServers } from "../../store/servers";
import header from '../../Images/discover-header-png.png'
import './discover.css'


function Discover() {
    const servers = useSelector(state => state.Servers)
    console.log('DISCOVER SERVERS STATE', servers)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getAllServers());
    }, [dispatch]);

    return (
      <div id="discover">
        
          <div id="discover-title">
          <img id="discover-headr-img" src={header} alt="header" />
            <h1 id="discover-title-2">FIND YOUR COMMUNITY ON Q_CORD</h1>
            <div id="discover-title-2">
              From gaming, to music, to learning, there's a safe place for you
            </div>
          
        </div>
        {Object.values(servers).map((server) => (
          <div id="single-server">
            <div id="singel-server-name">{server.name}</div>
            <img src={server.preview_image} id="singel-server-img" />
            <div id="singel-server-description">
              {server.Server_description}
            </div>
            <div id="single-server-online">
              Online since: {server.created_at}{" "}
            </div>
            <div id="single-server-members">{server.num_member} Members</div>
          </div>
        ))}
      </div>
    );
}

export default Discover
