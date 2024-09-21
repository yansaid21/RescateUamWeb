import React from 'react';
import './Login.css';
import  Logo  from '../../../assets/Logos_UAM-07.png'
import { Button, Form, Input } from 'antd';
import { GoogleButton } from '../../atoms/GoogleButton/GoogleButton';
import { Link } from 'react-router-dom';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const Login = () => {
    return (
        <div className='content'>
            <img src={Logo} className='content__logo'/>
            <h2 className='content__title'>Bienvenido a Rescate UAM</h2>
            <Form
                name="basic"
                className='content__form'
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
                <Form.Item
                    rules={[
                        {
                        required: true,
                        message: '¡Ingresa tu correo!',
                        },
                    ]}
                    >
                    <Input placeholder="Correo" className='content__input'/>
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                        required: true,
                        message: '¡Ingresa tu contraseña!',
                        },
                    ]}
                    >
                    <Input.Password placeholder='Contraseña' className='content__input'/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className='content__button'>
                        Aceptar
                    </Button>
                </Form.Item>
            </Form>
            <h4 className='content__text'>Entrar con</h4>
            <GoogleButton/>
            <Link className='content__text' to='/register'>Registrarse</Link>
        </div>
    )
}


