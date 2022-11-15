import React, { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServerDetails } from '../../store/servers';

const ServerDetail = () =>{
  const {serverId} = useParams()
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getServerDetails(serverId))
  })
  return(
    <h1>server details</h1>
  )
}

export default ServerDetail
