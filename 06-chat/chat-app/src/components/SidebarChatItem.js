import React, { useContext } from 'react'
import avatar from '../avatar.png';
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';

export const SidebarChatItem = ({ usuario }) => {

    const { chatState, dispatch } = useContext(ChatContext);
    const {  chatActivo } = chatState;

    const onClick = async () => {
        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        })
        // Cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${usuario.uid}`);

        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        })

        scrollToBottom('mensajes');
    }

    return (
        <div 
            className={`chat_list ${ (usuario.uid === chatActivo) &&  'active_chat'}`}
            onClick={onClick}
        >
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src={avatar} alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ usuario.nombre }<span className="chat_date">Dec 25</span></h5>
                    {
                        (usuario.online)
                        ? <span className="text-success">Online</span>
                        : <span className="text-danger">Offline</span>
                    }
              
                    {/* <p>Test, which is a new approach to have all solutions
                        astrology under one roof.</p> */}
                </div>
            </div>
        </div>
    )
}
