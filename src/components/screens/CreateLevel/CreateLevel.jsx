import React from 'react';
import './CreateLevel.css';
import { Button, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import { ENV } from '../../../utils/constants';
import LevelsController from '../../../api/levels';

export const CreateLevel = ({onClose}) => {

    const validate = (values) => {
        const errors = {};
    
        if (!values.name) {
            errors.name = "Este campo es requerido";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(values.name)) {
            errors.name = "No acepta caracteres especiales";
        }
    
        if (!values.description) {
            errors.description = "Este campo es requerido";
        } else if (!/^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(values.description)) {
            errors.description = "No admite caracteres especiales";
        }
        return errors;
    };
    
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validate,
        onSubmit: async (values) => {
            console.log("values ", values);
            try {
                const levelsData = {
                    name: values.name,
                    description: values.description,
                };
                const theLevels = await LevelsController.createLevels(
                ENV.INSTITUTION_ID,
                levelsData,
                );
                console.log("theLevels createLevels ", theLevels);
                message.success('Nivel/piso creado correctamente');
                onClose();
            } catch (error) {
                if (error.status === 422) {
                    message.error(error.response.data.message);
                } else {
                    message.error(error.response.data.message);
                }
            }
        },
    });

    return (
        <div className="level">
            <div className="level__content">
                <h2 className="level__title">¡Añadir Nivel!</h2>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div className="level__form">
                        <Form.Item>
                        <Input
                            placeholder="Nombre"
                            className="form__input"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name ? (
                            <div className="error__text">{formik.errors.name}</div>
                        ) : null}
                        </Form.Item>
                    </div>
                    <TextArea
                        className="form__textarea"
                        rows={8}
                        placeholder="Descripción del nivel"
                        maxLength={5000}
                        name="description"
                        id="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors.description ? (
                        <div className="error__text">{formik.errors.description}</div>
                    ) : null}
                    <div className="btnlevel">
                        <Button
                        htmlType="submit"
                        className="form__buttonlevel"
                        type="submit"
                        >
                        Aceptar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

