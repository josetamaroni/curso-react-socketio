import React from 'react'
import avatar from '../avatar.png';

export const SidebarChatItem = () => {

    return (
        <div className="chat_list ">
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src={avatar} alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                    <span className="text-success">Online</span>
                    <span className="text-danger">Offline</span>
                    <p>Test, which is a new approach to have all solutions
                        astrology under one roof.</p>
                </div>
            </div>
        </div>
    )
}
