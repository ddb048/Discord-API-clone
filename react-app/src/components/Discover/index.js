import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllServers } from "../../store/servers";
import header from "../../Images/discover-header-png.png";
import "./discover.css";



function Discover() {
  const serversList = useSelector((state) => state.servers);
  const servers = serversList.servers
  console.log("DISCOVER SERVERS STATE", servers);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllServers());
  }, [dispatch]);

if (!servers) return null
else
return (
<>
    <div id="discover">
      <img id="discover-header-img" src={header} alt="header" />
     <img id="discover-header-img" src={header} alt="header" />
      <div id="discover-title">
        <h1 id="discover-title-2">FIND YOUR COMMUNITY ON Q_CORD</h1>
        <div id="discover-title-3">
          From gaming, to music, to learning, there's a safe place for you
        </div>
      </div>
      <div id="conteiner">
        {Object.values(servers).map((server) => (
          <NavLink key={server.name} id="discover-links" to={`/discover/servers/${server.id}`}>
            <div id="single-server">
              <div id="server-img-div">
                <img src={server.preview_image} id="single-server-img" />
              </div>
              <div id="single-server-content">
                <div id="single-server-name">{server.name}</div>
                <div id="single-server-description">
                  {server.Server_description}
                </div>
                <div id="single-server-description">
                  {server.num_member} Members
                </div>
              </div>
            </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Discover;
