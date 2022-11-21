import { useDispatch } from "react-redux"
import { createMember } from "../../store/member"
import { deleteServer, getAllCurrentUserServers } from "../../store/servers"

const MessageConfirmation = ({ user, serverId, setShowConfirm, errors }) => {
    const dispatch = useDispatch()
    console.log("server id in modal", serverId)
    console.log("errors from MessageConfirm", errors)

    const confirm = async (e) => {
        e.preventDefault()
        await dispatch(createMember({
            serverId: serverId.id,
            userId: user.id
        }))
        await dispatch(getAllCurrentUserServers())
        setShowConfirm(false)
    }
    //REVIEW - how to do error handling for this now?
    const cancel = (e) => {
        e.preventDefault()
        dispatch(deleteServer(serverId))
        // dispatch(getAllCurrentUserServers())
        setShowConfirm(false)
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <form id='form'>

                    <div className="text">
                        <h2>Ready to Chat?</h2>
                    </div>
                    {!!errors ?

                        <div className="errors-div-dm">{errors}</div>

                        :
                        <>
                            <div className="text">
                                <p>Enjoy this moment...</p>


                                <p>When you're ready, choose to start a chat or leave.  Once you start
                                    a chat, select them from your Direct Messages:</p>
                            </div>

                            <div className="buttons-div">
                                <button className="button" onClick={confirm}>Chat with this Person</button>
                                <button className="button" onClick={cancel}>Head Back</button>
                            </div>

                        </>
                    }

                </form>
            </div>
        </div >
    )
}


export default MessageConfirmation
