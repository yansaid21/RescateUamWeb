import React, { useState, useEffect } from 'react';
import './Login.css';
import Logo from '../../../assets/UAM/Logos_UAM-07.png';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useFormik } from 'formik';
import { Auth } from '../../../api/auth';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { userStore } from '../../../store/user'; 
import { User } from '../../../api/user';
/* import { getRoutes } from '../../../config/routes'; */


const authController = new Auth();
const userController = new User();

        
export const Login = () => {
    const setUser = userStore(state => state.setUser);
    const setRole = userStore(state => state.setRole);
    
    const handleSetUser = (newUser, role) => {
        console.log("entrando al handlesetUser en login");
        setUser(newUser);  
        setRole(role);      
        localStorage.setItem("role", role);
        console.log("user seteado en login");
        

        
    }
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            const data = {
                email: values.email,
                password: values.password,
                device_name: 'myDevice' 
            };

            try{
                const response = await authController.login(data);
                
                console.log('response en login ', response);
                console.log('response.user en login ', response.user);
                const rawRole = await userController.getRole(response.token, '1', response.user.id);
                const role = rawRole.data.role.id;

                console.log('role en login ', role);
                
                handleSetUser(response.user, role);
                console.log("user seteado en login");
                
                if (response.token) {
                    console.log('Login exitoso', response);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('id', response.user.id);
                    if (role ==1) {
                        navigate('/admin');
                        setIsLoading(false);
                    
                    }else if (role == 2){
                        navigate('/brigadist');
                        setIsLoading(false);
                    
                    }
                    else if (role == 3){
                        navigate('/user');
                        setIsLoading(false);
                    }
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

    if(isLoading){
        return <Spinner/>
    }

    return (
        <div className='content'>
            <img src={Logo} className='content__logo' />
            <h2 className='content__title'>Bienvenido a Rescate UAM</h2>
            <form
                className='content__form'
                autoComplete="off"
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
                    <Button htmlType="submit" className='content__button'>
                        Aceptar
                    </Button>
                </Form.Item>
            </form>
            <Link className='content__text' to='/register'>Registrarse</Link>
        </div>
    );
}
