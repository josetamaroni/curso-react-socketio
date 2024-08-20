import React from 'react'
import { SendMessage } from './SendMessage'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'

export const Messages = () => {
    return (
        <div className="mesgs">
            <div className="msg_history">
                {/* <!-- Mensaje recibido Inicio --> */}
                <IncomingMessage/>
                {/* <!-- Mensaje recibido Fin --> */}

                {/* <!-- Mensaje enviado inicio --> */}
                <OutgoingMessage/>
                {/* <!-- Mensaje enviado inicio --> */}
            </div>

            <SendMessage/>
        </div>
    )
}
