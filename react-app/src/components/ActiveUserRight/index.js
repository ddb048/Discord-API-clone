// import React, { useEffect } from 'react'
// import {useSelector,useDispatch} from 'react-redux'
// import {getAllCurrentUserServers} from '../../store/servers'
// import { useParams } from 'react-router-dom'
 
// function ActiveUserRight(){
//     const server = useSelector(state => state.servers)
//     const sessionUsers = useSelector(state => state.session)
//     const dispatch = useDispatch()


//     useEffect(()=>{
//         dispatch(getAllCurrentUserServers())
//     },[dispatch])
    
//     console.log('ACTIVE SERVER',server)
//     console.log('ACTIVE USER',sessionUsers)
//     return (
//       <>
//         {showMsg && (
//           <>
//             <div className="user-details">
//               <div className="user-name-id">
//                 {otherMember[0].user_info.first_name}{" "}
//                 {otherMember[0].user_info.last_name}#{otherMember[0].id}
//               </div>
//               <img
//                 className="user-img"
//                 src={otherMember[0].user_info.profile_pic}
//                 alt=""
//               />
//             </div>

//             <div className="user-dms">
//               <div>
//                 Joind Q-core at: {otherMember[0].user_info.joined.slice(0, 17)}
//               </div>
//             </div>
//           </>
//         )}
//       </>
//     );



// }

// export default ActiveUserRight