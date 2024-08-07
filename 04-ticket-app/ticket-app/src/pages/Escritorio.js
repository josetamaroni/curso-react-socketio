import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';

import { SocketContext } from '../context/SocketContext';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;


export const Escritorio = () => {

  const [ usuario ] = useState( getUsuarioStorage() );

  const { socket } = useContext( SocketContext );
  const [ticket, setTicket] = useState(null);

  const navigate = useNavigate();


  const salir = () => {
    localStorage.clear();
    navigate('/ingresar')
  }
  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario, ( ticket ) => {
      setTicket(ticket);
    });
  }

  useEffect(() => {
    if ( !usuario.agente || !usuario.escritorio) {
      navigate('/ingresar');
    }
  }, [navigate, usuario]);

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{ usuario.agente }</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type='success'>{ usuario.escritorio }</Text>
        </Col>

        <Col span={4}  align='right'>
          <Button type='primary' danger shape='round' onClick={ salir }>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider/>

      {
        ticket && (
          <Row>
            <Col>
              <Text>Está atendiendo el ticket número: </Text>
              <Text style={{ fontSize:30 }} type='danger'> { ticket.numero } </Text>
            </Col>
          </Row>
        )
      }

      <Row>
        <Col offset={18} span={6} align='right'>
          <Button type='primary' shape='round' onClick={ siguienteTicket }>
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  )
}
