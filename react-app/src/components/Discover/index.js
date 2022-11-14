import React from "react";
import { useSelector } from 'react-redux'

function Discover() {
    const servers = useSelector(state => state.servers)
    return (
        <h1>Discovery Page</h1>
    )
}

export default Discover
