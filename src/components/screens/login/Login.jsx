import React from 'react';
import './Login.css';
import Logo from '../../../assets/UAM/Logos_UAM-07.png';
import { Button, Form, Input } from 'antd';
import { GoogleButton } from '../../atoms/GoogleButton/GoogleButton';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useFormik } from 'formik';
import { Auth } from '../../../api/auth';
import CompleteRegister from '../../atoms/completeRegister/CompleteRegister';

const authController = new Auth();

export const Login = () => {
    const navigate = useNavigate(); // Obtén la función de navegación

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
        onSubmit: async values => {

            const data = {
                email: values.email,
                password: values.password,
                device_name: 'myDevice' 
            };

            try{
                const response = await authController.login(data);
                
                console.log('response en login ', response);
                
                if (response.token) {
                    console.log('Login exitoso', response);
                    navigate('/main');
                } else if(response.status === 422){
                    console.log('Error de login', response);
                    alert('Contraseña incorrecta. Inténtalo de nuevo.');
                }
            } catch(error){
                if (error.response) {
                    if (error.response.status === 422) {
                        alert('Contraseña incorrecta. Inténtalo de nuevo.');
                    } else {
                        alert('Error durante el inicio de sesión. Por favor, intenta más tarde.');
                    }
                }
            }

        }
    });

    return (
        <div className='content'>
            <img src={Logo} className='content__logo' />
            <h2 className='content__title'>Bienvenido a Rescate UAM</h2>
            <form
                className='content__form'
                labelCol={{
                    span: 8,
                }}
                autoComplete="off"
                onFinish={formik.handleSubmit} 
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
                    <Button htmlType="submit" className='content__button'>
                        Aceptar
                    </Button>
                    <Button>
                        <CompleteRegister/>
                    </Button>
                </Form.Item>
            </form>
            <Link className='content__text' to='/register'>Registrarse</Link>
        </div>
    );
}
