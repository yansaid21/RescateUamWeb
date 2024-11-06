import React, { useEffect, useState } from 'react';
import './CreateMeetPoint.css';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import { Button, Form, Input, Select } from 'antd';
import { MeetPoints } from '../../../api/meet_points';
import { CreateZones } from '../CreateZones/CreateZones';
import { Zones } from '../../../api/zones';

const meetPointController = new MeetPoints();
const zonesController = new Zones();


export const CreateMeetPoint = ({ onClose, onAddZone }) => {
    useEffect(() => {
        const getZones = async () => {
            try {
                const token = await localStorage.getItem('token');
                console.log('token ', token);
                
                const rawZones = await zonesController.getZones(token,1);
                const zones = rawZones.data
                console.log('zones ', zones);
                setZones(zones);
            } catch (error) {
                console.log(error);
            }
        };
        getZones();
    }, []);
    const [zones, setZones] = useState([{ id: 1, name: 'Zona 1' }]);
    const [showCreateZone, setShowCreateZone] = useState(false);

    const validate = values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Este campo es requerido';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(values.name)) {
            errors.name = 'No acepta caracteres especiales';
        }

        if (!values.zone) {
            errors.zone = 'Seleccione una zona';
        }

        if (!values.description) {
            errors.description = 'Este campo es requerido';
        } else if (!/^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(values.description)) {
            errors.description = 'No admite caracteres especiales';
        }
        return errors;
    }; 

    const formik = useFormik({
        initialValues: {
            name: '',
            zone: 1,
            description: '',
        },
        validate,
        onSubmit: async values => {
            console.log('values ', values);
            try{
                const token = await localStorage.getItem('token');
                const meetPointData = {
                    name: values.name,
                    description: values.description,
                    zones: [ Number(values.zone) ] 
                };
                const meet_point = await meetPointController.createMeetPoint(token, 1, meetPointData);
                console.log('meet_point createMeetPoint ', meet_point);
                onClose();
            } catch (error){
                console.log(error);
                
            }
        }
    });

    const handleAddZone = () => {
        onAddZone();
        };
        
        return (
            <div className="meetpoint">
            <div className="meetpoint__content">
                <h2 className="meetpoint__title">¡Añadir punto de encuentro!</h2>
                <form
                    className='form'
                    onSubmit={formik.handleSubmit}
                    >
                <div className='meetpoint__form'>
                    <Form.Item>
                        <Input 
                            placeholder="Nombre" 
                            className='form__input'
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            />
                        {formik.errors.name ? <div className='error__text'>{formik.errors.name}</div> : null}
                    </Form.Item>
                    <Form.Item>
                        <Select
                            placeholder="Zona"
                            className='form__input'
                            id="zone"
                            name="zone"
                            onChange={value => {
                                if (value === "addZone") {
                                    handleAddZone();
                                } else {
                                    formik.setFieldValue('zone', value);
                                }
                            }} 
                            value={formik.values.zone}
                            >
                            {zones.map((zone) => (
                                <Select.Option key={zone.id} value={zone.id}>
                                    {zone.name}
                                </Select.Option>
                            ))}
                            <Select.Option value="addZone" style={{ color: '#007BFF', fontWeight: 'bold' }}>
                                + Añadir Zona
                            </Select.Option>
                        </Select>
                        {formik.errors.zone ? <div className='error__text'>{formik.errors.zone}</div> : null}
                        {showCreateZone && <CreateZones onClose={() => setShowCreateZone(false)}/>}
                    </Form.Item>
                </div>
                    <TextArea 
                        className='form__textarea'
                        rows={8} 
                        placeholder="Descripción del incidente" 
                        maxLength={5000} 
                        name="description"
                        id="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        />
                    {formik.errors.description ? <div className='error__text'>{formik.errors.description}</div> : null}
                    <div className='btnmeetpoint'>
                        <Button htmlType="submit" className='form__buttonmeetpoint' type="submit">
                            Aceptar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
