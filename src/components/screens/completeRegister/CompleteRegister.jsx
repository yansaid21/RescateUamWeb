import React, { useState } from "react";
import "./CompleteRegister.css";
import { Button, Form, Input, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import UserController from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../store/user";
import { Spinner } from "../../atoms/Spinner/Spinner";

const CompleteRegister = ({ onClose }) => {
  const { user } = userStore();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.rhgb) {
      errors.rhgb = "Este campo es requerido";
    }
    if (!values.phone_number) {
      errors.phone_number = "Este campo es requerido";
    } else if (!/^[0-9]+$/i.test(values.phone_number)) {
      errors.phone_number = "El número de teléfono debe ser un número entero";
    }
    if (!values.social_security) {
      errors.social_security = "Este campo es requerido";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/.test(values.social_security)) {
      errors.social_security = "Debe contener letras";
    }
    if (!values.code) {
      errors.code = "Este campo es requerido";
    } else if (!/^[A-Za-z0-9]+$/i.test(values.code)) {
      errors.code = "El código no debe contener espacios";
    }
    if (!file) {
      errors.photo = "Debes subir una foto";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      rhgb: "",
      phone_number: "",
      social_security: "",
      code: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log("values ", { ...values, photo: file });
      try {
        const id_user = user.id;

        const userInfo = await UserController.getUserInfo(Number(id_user));
        console.log("userInfo:", userInfo);
        const userData = {
          ...values,
          photo: file,
          name: userInfo.data.name,
          last_name: userInfo.data.last_name,
          id_card: userInfo.data.id_card,
        };

        const response = await UserController.updateUser(
          Number(id_user),
          userData,
        );
        console.log("Datos actualizados correctamente", response);
        message.success('Datos actualizados correctamente');
        onClose();
        navigate("/admin");
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        if (error.status === 422) {
          message.error(error.response.data.message);
        } else {
          message.error(error.response.data.message);
        }
      } finally {
        setIsLoading(false); // Ocultar el spinner
      }
    },
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
  
      if (selectedFile.size > maxSizeInBytes) {
        message.error("La imagen no debe exceder los 2 MB");
        return; 
      }
  
      setFile(selectedFile); // Almacena el archivo seleccionado
      const fileURL = URL.createObjectURL(selectedFile); 
      setPreview(fileURL); 
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">¡Completa tu registro!</h2>
        {isLoading ? ( // Condicional para mostrar el spinner
          <Spinner/> 
        ) : (
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="section">
            <Form.Item>
              <Select
                placeholder="Grupo sanguíneo"
                className="form__input"
                id="rhgb"
                name="rhgb"
                onChange={(value) => formik.setFieldValue("rhgb", value)} // Actualiza el valor en Formik
                value={formik.values.rhgb}
              >
                <Select.Option value="A+">A+</Select.Option>
                <Select.Option value="A-">A-</Select.Option>
                <Select.Option value="B+">B+</Select.Option>
                <Select.Option value="B-">B-</Select.Option>
                <Select.Option value="AB+">AB+</Select.Option>
                <Select.Option value="AB-">AB-</Select.Option>
                <Select.Option value="O+">O+</Select.Option>
                <Select.Option value="O-">O-</Select.Option>
              </Select>
              {formik.errors.rhgb ? (
                <div className="error__text">{formik.errors.rhgb}</div>
              ) : null}
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Celular"
                className="form__input"
                id="phone_number"
                name="phone_number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
              />
              {formik.errors.phone_number ? (
                <div className="error__text">{formik.errors.phone_number}</div>
              ) : null}
            </Form.Item>
          </div>
          <div className="section">
            <Form.Item>
              <Input
                placeholder="EPS"
                className="form__input"
                id="social_security"
                name="social_security"
                onChange={formik.handleChange}
                value={formik.values.social_security}
              />
              {formik.errors.social_security ? (
                <div className="error__text">
                  {formik.errors.social_security}
                </div>
              ) : null}
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Código UAM"
                className="form__input"
                id="code"
                name="code"
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              {formik.errors.code ? (
                <div className="error__text">{formik.errors.code}</div>
              ) : null}
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
            {formik.errors.photo ? (
              <div className="error__text">{formik.errors.photo}</div>
            ) : null}
          </Form.Item>
          {preview && (
            <div className="image__preview">
              <img src={preview} alt="Preview" className="preview__img" />
            </div>
          )}
          <Form.Item className="btn">
            <Button htmlType="submit" className="form__button" type="submit">
              Aceptar
            </Button>
          </Form.Item>
        </form>
      )}
      </div>
    </div>
  );
};

export default CompleteRegister;
