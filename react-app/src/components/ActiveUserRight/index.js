import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getAllCurrentUserServers} from '../../store/servers'
import { useParams } from 'react-router-dom'
 
function ActiveUserRight(){
    const server = useSelector(state => state.servers)
    const sessionUsers = useSelector(state => state.session)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getAllCurrentUserServers())
    },[dispatch])
    
    console.log('ACTIVE USER',server)
    console.log('ACTIVE USER',sessionUsers)
    return (
        <>
            <div className='user-details'>
                <div className='user-name-id'></div>
                <img className='user-img' src='' alt='' />
            </div>

            <div className='user-dms'>
                <div></div>
                <div></div>
            </div>
        </>
    )



}

export default ActiveUserRight