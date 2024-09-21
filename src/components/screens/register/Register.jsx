import React from 'react'
import  Logo  from '../../../assets/Logos_UAM-07.png';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import './Register.css';
import { Link } from 'react-router-dom';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const register = () => {
  return (
    <div className='register'>
        <img src={Logo} className='register__logo'/>
        <h2 className='register__title'>Regístrate en Rescate UAM</h2>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >   
            <Row gutter={16}>
                <Col>
                    <Form.Item
                        rules={[
                            {
                            required: true,
                            message: '¡Ingresa tu correo!',
                            },
                        ]}
                        >
                        <Input placeholder="Correo UAM" className='register__input'/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        rules={[
                            {
                            required: true,
                            message: '¡Ingresa tu nombre!',
                            },
                        ]}
                        >
                        <Input placeholder="Nombre" className='register__input'/>
                    </Form.Item>
                    
                </Col>
            </Row>
            <Row gutter={16}>
                <Col >
                    <Form.Item
                        rules={[
                            {
                            required: true,
                            message: '¡Ingresa tu contraseña!',
                            },
                        ]}
                        >
                        <Input.Password placeholder='Contraseña' className='register__input'/>
                    </Form.Item>
                    
                </Col>
                <Col>
                    <Form.Item
                        rules={[
                            {
                            required: true,
                            message: '¡Ingresa tu apellido!',
                            },
                        ]}
                        >
                        <Input placeholder="Apellido" className='register__input'/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <Form.Item
                        rules={[
                            {
                            required: true,
                            message: 'Repite tu contraseña!',
                            },
                        ]}
                        >
                        <Input.Password placeholder='Repetir Contraseña' className='register__input'/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        rules={[
                            {
                            required: true,
                            message: '¡Ingresa tu programa!',
                            },
                        ]}
                        >
                        <Input placeholder="Programa" className='register__input'/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='register__inputs'>
                    <Form.Item
                        rules={[
                            {
                            required: true,
                            message: '¡Ingresa tu número de identidad!',
                            },
                        ]}
                        >
                        <Input placeholder="Cédula/Tarjeta Identidad" className='register__input'/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='register__inputs'>
                    <Form.Item
                        name="remember"
                        valuePropName="unchecked"
                    >
                        <Checkbox>
                            Aceptar{' '}
                            <Link className='register__terms'>
                                términos y condiciones
                            </Link>
                        </Checkbox>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='register__inputs'>
                    <Form.Item>
                        <Button htmlType="submit" className='register__button'>
                            Aceptar
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            </Form>
    </div>
  )
}
