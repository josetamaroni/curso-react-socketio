import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { UiContext } from '../context/UiContext';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;


export const Ingresar = () => {
  const { showMenu } = useContext( UiContext );
  showMenu();

  const navigate = useNavigate();

  const [ usuario ] = useState( getUsuarioStorage() );

  const onFinish = ({ agente, escritorio }) => {
    localStorage.setItem('agente',agente);
    localStorage.setItem('escritorio',escritorio);
    navigate('/escritorio');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (usuario.agente && usuario.escritorio) {
      navigate('/escritorio');
    }
  }, [navigate, usuario]);

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y número de escritorio</Text>
      <Divider/>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[
            {
              required: true,
              message: 'Por favor, ingrese su nombre de usuario!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: 'Por favor, ingrese el número de escritorio!',
            },
          ]}
        >
          <InputNumber min={1} max={99}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" shape='round'>
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
