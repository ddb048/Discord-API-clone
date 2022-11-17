import React,{useState} from 'react'
// import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllCurrentUserServers } from '../../store/servers'
import './index.css'

const Channels = () =>{
  const [channel, setChannel] = useState([])
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch()

  const new_channel = e =>{

  }
  // const switchChannel = e =>{

  // }
  return (
    <h1> this is channels page inside server component</h1>
  )
}
export default Channels
