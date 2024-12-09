import React, { useEffect, useState } from 'react'
import './Profile.css';
import UserController from '../../../api/user';
import { Card, Descriptions, Avatar, Tag, Button } from 'antd';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { LogoutOutlined } from '@ant-design/icons';

export const Profile = () => {
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const id_user = localStorage.getItem('id');
            const user = await UserController.getUserInfo(id_user);
            console.log('user profile ', user.data);
            
            setUserInfo(user.data);
        } catch (error){
            console.log('Error en profile ', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Spinner />
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>No se pudo cargar la información del usuario.</p>
            </div>
        );
    }

    //cerrar sesión
    const handleLogout = () => {
        // Lógica para cerrar sesión
        localStorage.clear(); // Limpia el almacenamiento local
        window.location.href = '/'; // Redirige al login
    };

    return (
        <Card
            title="Información del Usuario"
            style={{ width: '100%', maxWidth: 600, margin: '20px auto' }}
        >
        <Avatar
            size={100}
            src={userInfo.photo_path}
            alt={`${userInfo.name} ${userInfo.last_name}`}
            style={{ marginBottom: 20 }}
        />
        <Descriptions bordered column={1}>
            <Descriptions.Item label="Nombre">
            {userInfo.name} {userInfo.last_name}
            </Descriptions.Item>
            <Descriptions.Item label="Correo Electrónico">{userInfo.email}</Descriptions.Item>
            <Descriptions.Item label="Cédula">{userInfo.id_card}</Descriptions.Item>
            <Descriptions.Item label="RH y Grupo Sanguíneo">{userInfo.rhgb}</Descriptions.Item>
            <Descriptions.Item label="EPS">{userInfo.social_security}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{userInfo.phone_number}</Descriptions.Item>
            <Descriptions.Item label="Código">{userInfo.code}</Descriptions.Item>
        </Descriptions>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Button 
                type="primary" 
                icon={<LogoutOutlined />} 
                danger 
                onClick={handleLogout}
            >
                Cerrar sesión
            </Button>
        </div>
    </Card>
    )
}
