import { Typography, Row, Col, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { UiContext } from '../context/UiContext';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const CrearTicket = () => {

  const { hideMenu } = useContext( UiContext );
  const { socket } = useContext( SocketContext );

  const [ticket, setTicket] = useState(null);

  hideMenu();

  const nuevoTicket = () => {
    socket.emit('solicitar-ticket', null, ( ticket ) => {
      setTicket(ticket);
    });
  }

  return (
    <>
      <Row>
        <Col span={14} offset={6} align='center'>
          <Title level={3}>Presione el botón para un nuevo ticket</Title>
          <Button type='primary' shape='round' size='large' onClick={ nuevoTicket }>
            <DownloadOutlined />
            Nuevo ticket
          </Button>
        </Col>
      </Row>
      
      {
        ticket && (
          <Row style={{ marginTop:100 }}>
            <Col span={14} offset={6} align='center'>
                <Text level={2}>
                  Su número es
                </Text>
                <br/>
                <Text type='success' style={{ fontSize:55 }}>
                  { ticket.numero }
                </Text>
            </Col>
          </Row>
        )
      }
    </>
  )
}
