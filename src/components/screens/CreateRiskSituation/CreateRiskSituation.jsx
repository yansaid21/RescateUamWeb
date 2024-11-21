import React from "react";
import "./CreateRiskSituation.css";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import RiskSituationsController from "../../../api/risk_situations";

export const CreateRiskSituation = ({ onClose }) => {
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Este campo es requerido";
    } else if (!/^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(values.name)) {
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
        const token = await localStorage.getItem("token");
        const riskSituationData = {
          name: values.name,
          description: values.description,
        };
        const risk = await RiskSituationsController.createRiskSituation(
          token,
          riskSituationData,
          1,
        );
        console.log("risk ", risk);
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="risk">
      <div className="risk__content">
        <h2 className="risk__title">¡Añadir riesgo!</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <Form.Item>
            <Input
              placeholder="Nombre riesgo"
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
          <TextArea
            className="form__textarea"
            rows={8}
            placeholder="Descripción"
            maxLength={5000}
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description ? (
            <div className="error__text">{formik.errors.description}</div>
          ) : null}
          <div className="btnrisk">
            <Button
              htmlType="submit"
              className="form__buttonrisk"
              type="submit"
            >
              Aceptar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
