import { useDispatch } from "react-redux"
import { createMember } from "../../store/member"
import { deleteServer, getAllCurrentUserServers } from "../../store/servers"

const DeleteConfirmation = ({id}) => {
    const dispatch = useDispatch()
    console.log("server id in delete confirmation modal", id)


    const confirm = (e) => {
        e.preventDefault()
       dispatch(deleteServer(id))
        dispatch(getAllCurrentUserServers())
        setShowConfirm(false)
    }

    const cancel = (e) => {
        e.preventDefault()
        setShowConfirm(false)
    }

    return (
        <fieldset>
            {!!errors ?

                <div>{errors}</div>

                :
                <>
                    <h3>Are you Sure you want to Delete this Message?</h3>
                    <button onClick={confirm}>Yes</button>
                    <button onClick={cancel}>No</button>
                </>
            }

        </fieldset>
    )
}


export default DeleteConfirmation
