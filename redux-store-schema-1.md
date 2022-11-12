
store = {
sessionUser: {
    id, 
    username, 
    firstName,
    lastName, 
    email, 
    profilePic
    server: [serverIds]
}

server: {
    id, 
    ownerId, 
    name, 
    imageUrl
    serverChannels: [channelsIds]

}

channels: {
    id, topic, imageUrl,
    messages: [messageIds]
    
}
messages: {
    id,
    userId,
    serverId,
    channelId
    dmId
}

dm: {
    id,
    userId1,
    userId2,
    messages: [messageIds]
}
}





