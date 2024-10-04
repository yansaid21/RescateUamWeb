import React from 'react';
import './Login.css';
import  Logo  from '../../../assets/Logos_UAM-07.png'
import { Button, Form, Input } from 'antd';
import { GoogleButton } from '../../atoms/GoogleButton/GoogleButton';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

export const Login = () => {
    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Este campo es requerido';
        } else if (!/^[A-Z0-9._%+-]+@autonoma\.edu\.co$/i.test(values.email)) {
            errors.email = 'Correo inválido, debe ser dominio @autonoma';
        }
        if (!values.password) {
            errors.password = 'Este campo es requerido';
        }
        return errors;
    }; 
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
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
            <form
                className='content__form'
                onSubmit={formik.handleSubmit}
            >
                <Form.Item>
                    <Input 
                        placeholder="Correo" 
                        className='content__input'
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                        {formik.errors.email ? <div className='content__error'>{formik.errors.email}</div> : null}
                </Form.Item>
                <Form.Item>
                    <Input.Password 
                        placeholder='Contraseña' 
                        className='content__input'
                        id='password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        />
                        {formik.errors.password ? <div className='content__error'>{formik.errors.password}</div> : null}
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className='content__button' type="submit">
                        Aceptar
                    </Button>
                </Form.Item>
            </form>
            <h4 className='content__text'>Entrar con</h4>
            <GoogleButton/>
            <Link className='content__text' to='/register'>Registrarse</Link>
        </div>
    )
}


