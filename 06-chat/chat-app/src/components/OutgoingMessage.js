import React from 'react';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

export const OutgoingMessage = ({ msg }) => {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ msg.mensaje }</p>
                <span className="time_date">{ moment(msg.createdAt).format('HH:mm a | MMMM Do') }</span>
            </div>
        </div>
    )
}
