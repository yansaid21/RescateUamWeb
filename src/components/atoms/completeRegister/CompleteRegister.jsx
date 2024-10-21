import React, { useState } from 'react';
import './CompleteRegister.css'; 
//import { updateUserInfoComplete } from '../../auth/put';
import { Button, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';

const CompleteRegister = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const validate = values => {

        const errors = {};
        if (!values.rhgb) {
            errors.rhgb = 'Este campo es requerido';
        } else if (!/^(A|B|AB|O)[+-]$/i.test(values.rhgb)) {
            errors.rhgb = 'Inválido. Por ejemplo, debe ser A+, O+, etc.';
        }
        if(!values.phone_number){
            errors.phone_number = 'Este campo es requerido';
        } else if (!/^[0-9]+$/i.test(values.phone_number)){
            errors.phone_number = 'El número de teléfono debe ser un número entero';
        }
        if(!values.social_security){
            errors.social_security = 'Este campo es requerido';
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/.test(values.social_security)){
            errors.social_security = 'Debe contener letras';
        }
        if(!values.code){
            errors.code = 'Este campo es requerido';
        } else if (!/^[A-Za-z0-9]+$/i.test(values.code)){
            errors.code = 'El código no debe contener espacios';
        }
        if (!file) {
            errors.photo = 'Debes subir una foto';
        }
        return errors;
    }; 

    const formik = useFormik({
        initialValues: {
            rhgb: '',
            phone_number: '',
            social_security: '',
            code: ''
        },
        validate,
        onSubmit: async values => {
            console.log('values ', { ...values, photo: file });
        }
    });

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile); // Almacena el archivo seleccionado
            const fileURL = URL.createObjectURL(selectedFile); // Crea la URL de previsualización
            setPreview(fileURL); // Guarda la URL para previsualización
        }
    };

    return (
        <div className="modal">
            <div className="modal__content">
                <h2 className="modal__title">¡Completa tu registro!</h2>
                <form
                    className='form'
                    onSubmit={formik.handleSubmit}
                >
                    <div className='section'>
                    <Form.Item>
                        <Input 
                            placeholder="Grupo sanguíneo" 
                            className='form__input'
                            id="rhgb"
                            name="rhgb"
                            onChange={formik.handleChange}
                            value={formik.values.rhgb}
                        />
                        {formik.errors.rhgb ? <div className='error__text'>{formik.errors.rhgb}</div> : null}
                    </Form.Item>
                    <Form.Item>
                        <Input 
                            placeholder="Celular" 
                            className='form__input'
                            id="phone_number"
                            name="phone_number"
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                        />
                        {formik.errors.phone_number ? <div className='error__text'>{formik.errors.phone_number}</div> : null}
                    </Form.Item>
                    </div>
                    <div className='section'>

                    <Form.Item>
                        <Input 
                            placeholder="EPS" 
                            className='form__input'
                            id="social_security"
                            name="social_security"
                            onChange={formik.handleChange}
                            value={formik.values.social_security}
                        />
                        {formik.errors.social_security ? <div className='error__text'>{formik.errors.social_security}</div> : null}
                    </Form.Item>
                    <Form.Item>
                        <Input 
                            placeholder="Código UAM" 
                            className='form__input'
                            id="code"
                            name="code"
                            onChange={formik.handleChange}
                            value={formik.values.code}
                        />
                        {formik.errors.code ? <div className='error__text'>{formik.errors.code}</div> : null}
                    </Form.Item>
                    </div>
                    <Form.Item>
                        <label className="upload__label" htmlFor="photo">
                            <UploadOutlined className="upload__icon" />
                            <span> Subir foto </span>
                        </label>
                        <input 
                            type="file" 
                            id="photo" 
                            className="form__input__photo"
                            accept="image/*" 
                            onChange={handleFileChange} 
                        />
                        {formik.errors.photo ? <div className='error__text'>{formik.errors.photo}</div> : null}
                    </Form.Item>
                    {preview && ( 
                        <div className="image__preview">
                            <img src={preview} alt="Preview" className="preview__img" />
                        </div>
                    )}
                    <Form.Item>
                        <Button htmlType="submit" className='form__button' type="submit">
                            Aceptar
                        </Button>
                    </Form.Item>
                </form>
            </div>
        </div>
    )
};

export default CompleteRegister;
