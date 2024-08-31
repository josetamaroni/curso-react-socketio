import React from 'react'
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

export const IncomingMessage = ({ msg }) => {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ msg.mensaje }</p>
                    <span className="time_date">{ moment(msg.createdAt).format('HH:mm a | MMMM Do') }</span>
                </div>
            </div>
        </div>
    )
}
