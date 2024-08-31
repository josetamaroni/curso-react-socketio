import React, { useContext } from 'react'
import { SendMessage } from './SendMessage'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { ChatContext } from '../context/chat/ChatContext'
import { AuthContext } from '../auth/AuthContext'

export const Messages = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    return (
        <div className="mesgs">
            <div id="mensajes" className="msg_history pb-4">
                {
                    chatState.mensajes.map((msg) => (
                        (msg.de === auth.uid)
                            ? <OutgoingMessage key={msg._id} msg={msg}/> 
                            : <IncomingMessage key={msg._id} msg={msg}/>
                    ))
                }
            </div>

            <SendMessage/>
        </div>
    )
}
