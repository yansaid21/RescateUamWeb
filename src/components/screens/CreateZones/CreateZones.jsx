import React, { useState } from "react";
import "./CreateZones.css";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { Button, Form, Input, message } from "antd";
import { ENV } from "../../../utils/constants";
import ZonesController from "../../../api/zones";

export const CreateZones = ({ onClose, onSuccess }) => {
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Este campo es requerido";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(values.name)) {
      errors.name = "No acepta caracteres especiales";
    }

    if (!values.zone) {
      errors.zone = "Seleccione una zona";
    }

    if (!values.description) {
      errors.description = "Este campo es requerido";
    } else if (!/^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s.,]+$/.test(values.description)) {
      errors.description = "No admite caracteres especiales";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      zone: 1,
      description: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log("values ", values);
      try {
        const zonesData = {
          name: values.name,
          description: values.description,
        };
        const theZones = await ZonesController.createZones(
          ENV.INSTITUTION_ID,
          zonesData
        );
        console.log("theZones createZones ", theZones);
        message.success("Zona creada correctamente");
        onClose();
        onSuccess(theZones.data);
      } catch (error) {
        console.log(error);
        if (error.status === 422) {
          message.error(error.response.data.message);
        } else {
          message.error(error.response.data.message);
        }
      }
    },
  });

  return (
    <div className="zone">
      <div className="zone__content">
        <h2 className="zone__title">¡Añadir Zona!</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="zone__form">
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
            placeholder="Descripción de la zona"
            maxLength={5000}
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description ? (
            <div className="error__text">{formik.errors.description}</div>
          ) : null}
          <div className="btnzone">
            <Button
              htmlType="submit"
              className="form__buttonzone"
              type="submit"
            >
              Aceptar
            </Button>
            <Button
              className="form__buttonroom"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
