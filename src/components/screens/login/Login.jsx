import React from 'react';
import './Login.css';
import  Logo  from '../../../assets/Logos_UAM-07.png'
import { Button, Form, Input } from 'antd';
import { GoogleButton } from '../../atoms/GoogleButton/GoogleButton';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const Login = () => {
    const validate = values => {
        const errors = {};
        if (!values.email) {
        errors.email = 'Este campo es requerido';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Correo inválido, debe ser dominio @autonoma';
        }
    
        return errors;
    }; 
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Form.Item
                    rules={[
                        {
                        required: true,
                        message: '¡Ingresa tu correo!',
                        },
                    ]}
                    >
                    <Input 
                        placeholder="Correo" 
                        className='content__input'
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        />
                        {formik.errors.email ? <div className='content__error'>{formik.errors.email}</div> : null}
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
                    <Button htmlType="submit" className='content__button' type="submit">
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


