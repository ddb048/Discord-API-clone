import React, {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCurrentUserServers } from "../../store/servers";
import { getServerDetails } from "../../store/servers";
import "./Servers.css"

const Servers = () =>{
  const dispatch = useDispatch()
  const history = useHistory()
  const users = useSelector(state => state.session.user)
  const servers = useSelector(state => state.Servers)
  console.log('this is server >>>>>',servers)
  useEffect(() =>{
    // console.log('dispatch is hit')
    dispatch(getAllCurrentUserServers())
    dispatch(getServerDetails(1))

  },[])
  return (
    <div>
    <div className="servers-column-container">
    {servers.map((server) => {
      return(
        <div className="server-icon" key={server.name}></div>
      )
    })}
      <h1>servers container</h1>
    </div>

    <h1>this is the servers page</h1>

    </div>
  )
}

export default Servers
