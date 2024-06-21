import { Typography, Row, Col, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';

const { Title, Text } = Typography;

export const CrearTicket = () => {

  const { hideMenu } = useContext( UiContext );
  hideMenu();
  const nuevoTicket = () => {
    console.log('nuevoTicket');
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

      <Row style={{ marginTop:100 }}>
        <Col span={14} offset={6} align='center'>
            <Text level={2}>
              Su número es
            </Text>
            <br/>
            <Text type='success' style={{ fontSize:55 }}>
              55
            </Text>
        </Col>
      </Row>
    </>
  )
}
