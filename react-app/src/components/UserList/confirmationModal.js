import { useDispatch } from "react-redux"
import { createMember } from "../../store/member"
import { deleteServer, getAllCurrentUserServers } from "../../store/servers"

const MessageConfirmation = ({user, serverId, setShowConfirm}) => {
    const dispatch = useDispatch()
    // console.log("server id in modal",serverId.id)
    // console.log('user id in modal', user.id)

    const confirm = (e) => {
        e.preventDefault()
        dispatch(createMember({
            serverId:serverId.id, userId:user.id
        }))
        setShowConfirm(false)
    }

    const cancel=(e)=>{
        e.preventDefault()
        dispatch(deleteServer(serverId.id))
        dispatch(getAllCurrentUserServers())
    }

    return (
        <fieldset>
            <h3>Are you Sure you want to Message this user</h3>
            <button onClick={confirm}>Yes</button>
            <button onClick={cancel}>No</button>
        </fieldset>
    )
}


export default MessageConfirmation
