import React, { useEffect, useState } from 'react'
import './Profile.css';
import UserController from '../../../api/user';
import { Card, Descriptions, Avatar, Tag, Button, Input, message } from 'antd';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { EditOutlined, LogoutOutlined, SaveOutlined } from '@ant-design/icons';
import { userStore } from '../../../store/user';

export const Profile = () => {
    const [userInfo, setUserInfo] = useState();
    const [userPhoto, setUserPhoto] = useState();
    const [loading, setLoading] = useState(true);
    const SERVER_IP = "rescueapi.xyz";
    const { user } = userStore();


    //editar info
    const [editingField, setEditingField] = useState(null); // Campo actualmente en edición
    const [editedValue, setEditedValue] = useState('');
    const [newPhoto, setNewPhoto] = useState(null);

    const getUser = async () => {
        try {
            const id_user = user.id;
            const response = await UserController.getUserInfo(id_user);
            console.log('user profile ', response.data.photo_path);
            setUserPhoto(response.data.photo_path);
            setUserInfo(response.data);
        } catch (error){
            console.log('Error en profile ', error);
        } finally {
            setLoading(false);
        }
    }

    //ediatr info
    const handleEditClick = (field) => {
        setEditingField(field);
        setEditedValue(userInfo[field]);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const id_user = user.id;
            await UserController.updateUser(id_user, { [editingField]: editedValue });
            setUserInfo((prev) => ({ ...prev, [editingField]: editedValue }));
            setEditingField(null);
            message.success('Información actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar: ', error);
            message.error('No se pudo actualizar la información');
        } finally {
            setLoading(false); // Ocultar el spinner
        }
    };

    const handleUpdatePhoto = async () => {
        setLoading(true); 
        if (!newPhoto) return;
        try {
            const updatedUser = await UserController.updateUser(user.id, { photo: newPhoto });
            setUserPhoto(updatedUser.photo_path); 
            setNewPhoto(null); 
            message.success('Información actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la foto:', error);
            message.error('No se pudo actualizar la información');
        } finally {
            setLoading(false); // Ocultar el spinner
        }
    };

    useEffect(() => {
        getUser();
    },)

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
        localStorage.clear(); 
        window.location.href = '/'; 
    };

    return (
        <Card
            title="Información del Usuario"
            style={{ width: '100%', maxWidth: 600, margin: '20px auto' }}
        >
        {loading ? (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Spin size="large" />
            </div>
        ) : (
            <>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Avatar
                        size={100}
                        src={`https://${SERVER_IP}${userPhoto}`}
                        alt={`${userInfo.name} ${userInfo.last_name}`}
                        style={{ marginBottom: 10 }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="photo-upload"
                        onChange={(e) => setNewPhoto(e.target.files[0])}
                    />
                    <label
                        htmlFor="photo-upload"
                        style={{
                            cursor: 'pointer',
                            color: '#1890ff',
                            display: 'block',
                            marginBottom: newPhoto ? 10 : 0,
                        }}
                    >
                        Cambiar foto
                    </label>
                    {newPhoto && (
                        <Button type="primary" onClick={handleUpdatePhoto}>
                            Guardar nueva foto
                        </Button>
                    )}
                </div>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Correo Electrónico">
                            {editingField === 'email' ? (
                                <>
                                    <Input
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {userInfo.email}
                                    <EditOutlined
                                        style={{ marginLeft: 10, cursor: 'pointer', color: '#1890ff' }}
                                        onClick={() => handleEditClick('email')}
                                    />
                                </>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Cédula">{userInfo.id_card}</Descriptions.Item>
                        <Descriptions.Item label="RH y Grupo Sanguíneo">{userInfo.rhgb}</Descriptions.Item>
                        <Descriptions.Item label="EPS">
                            {editingField === 'social_security' ? (
                                <>
                                    <Input
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {userInfo.social_security}
                                    <EditOutlined
                                        style={{ marginLeft: 10, cursor: 'pointer', color: '#1890ff' }}
                                        onClick={() => handleEditClick('social_security')}
                                    />
                                </>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Teléfono">
                            {editingField === 'phone_number' ? (
                                <>
                                    <Input
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {userInfo.phone_number}
                                    <EditOutlined
                                        style={{ marginLeft: 10, cursor: 'pointer', color: '#1890ff' }}
                                        onClick={() => handleEditClick('phone_number')}
                                    />
                                </>
                            )}
                        </Descriptions.Item>
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
            </>
        )}
    </Card>
    )
}