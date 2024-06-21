import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;


export const Escritorio = () => {

  const [ usuario ] = useState( getUsuarioStorage() );
  const navigate = useNavigate();


  const salir = () => {
    localStorage.clear();
    navigate('/ingresar')
  }
  const siguienteTicket = () => {
    console.log('siguienteTicket')
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
          <Title level={2}>Fernando</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type='success'>5</Text>
        </Col>

        <Col span={4}  align='right'>
          <Button type='primary' danger shape='round' onClick={ salir }>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider/>

      <Row>
        <Col>
          <Text>Está atendiendo el ticket número: </Text>
          <Text style={{ fontSize:30 }} type='danger'>55</Text>
        </Col>
      </Row>

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
