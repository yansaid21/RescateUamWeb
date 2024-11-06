import React from 'react'
import './CreateReport.css';
import { Button, Input  } from 'antd';
import { useFormik } from 'formik';
const { TextArea } = Input;
import { Incidents } from '../../../api/incidents';

const incidentController = new Incidents();

export const CreateReport = ({ onClose, risk }) => {
    const validate = values => {
        const errors = {};
        if (!values.description) {
            errors.description = 'Este campo es requerido';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(values.description)) {
            errors.description = 'No admite caracteres especiales';
        }
        return errors;
    }; 
    const formik = useFormik({
        initialValues: {
            description: '',
        },
        validate,
        onSubmit: async values => {
            console.log('values ', values);
            try{
                const token = await localStorage.getItem('token');
                const id_incident = await localStorage.getItem('id_incident');
                const update_incident = await incidentController.updateIncident(token, 1, risk, values.description, id_incident);
                console.log('update_incident createReport ', update_incident);
                onClose();
            } catch (error){
                console.log(error);
                
            }
        }
    });

    return (
        <div className="report">
            <div className="report__content">
                <h2 className="report__title">¡Llena tu reporte!</h2>
                <form
                    className='form'
                    onSubmit={formik.handleSubmit}
                >
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
                    <div className='btnreport'>
                        <Button htmlType="submit" className='form__buttonreport' type="submit">
                            Aceptar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

