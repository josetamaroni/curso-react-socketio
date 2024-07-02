import React, { useContext, useEffect, useState } from 'react'
import { Typography, Row, Col, List, Card, Tag, Divider } from 'antd';

import { UiContext } from '../context/UiContext';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';
const { Title, Text } = Typography;

export const Cola = () => {

  const { hideMenu } = useContext( UiContext );
  hideMenu();

  const { socket } = useContext( SocketContext );
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on('ticket-asignado', (asignado) => {
      console.log(asignado);
      setTickets( asignado );
    })
  
    return () => {
      socket.off('ticket-asignado');
    }
  }, [socket])

  useEffect(()=>{
    getUltimos().then( tickets => setTickets( tickets ) );
  },[])
  

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={ tickets.slice(0,3) }
            renderItem={ item => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop:16 }}
                  actions={[
                    <Tag color='volcano'>{ item.agente }</Tag>,
                    <Tag color='magenta'>Escritotio { item.escritorio }</Tag>,
                  ]}
                >
                  <Title>Nro. { item.numero }</Title>
                </Card>
              </List.Item>
            )}
          />
          
        </Col>
        
        <Col span={12}>      
          <Divider>Historial</Divider>
          <List
            dataSource={ tickets.slice(3) }
            renderItem={ item => (
              <List.Item>
                <List.Item.Meta
                  title={ `Ticket Nro. ${ item.numero }` }
                  description={
                    <>
                      <Text type='secondary'>En el escritorio: </Text>
                      <Tag color='magenta'>{ item.escritorio }</Tag>
                      <Text type='secondary'>Agente: </Text>
                      <Tag color='volcano'>{ item.agente }</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
