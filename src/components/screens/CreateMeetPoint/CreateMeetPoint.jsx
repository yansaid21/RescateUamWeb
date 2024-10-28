import React, { useState } from 'react';
import './CreateMeetPoint.css';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import { Button, Form, Input, Select } from 'antd';

export const CreateMeetPoint = () => {
    const [zones, setZones] = useState([]);

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
        } else if (!/^[a-zA-Z0-9\s]+$/.test(values.description)) {
            errors.description = 'No admite caracteres especiales';
        }
        return errors;
    }; 

    const formik = useFormik({
        initialValues: {
            name: '',
            zone: '',
            description: '',
        },
        validate,
        onSubmit: async values => {
            console.log('values ', values);
        }
    });

    const handleAddZone = () => {
        const newZone = prompt("Ingrese el nombre de la nueva zona:");
        if (newZone && !zones.includes(newZone)) {
            setZones([...zones, newZone]);
            formik.setFieldValue('zone', newZone); //nueva zona como la seleccionada
        }
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
                            {zones.map((zone, index) => (
                                <Select.Option key={index} value={zone}>
                                    {zone}
                                </Select.Option>
                            ))}
                            <Select.Option value="addZone" style={{ color: '#007BFF', fontWeight: 'bold' }}>
                                + Añadir Zona
                            </Select.Option>
                        </Select>
                        {formik.errors.zone ? <div className='error__text'>{formik.errors.zone}</div> : null}
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
