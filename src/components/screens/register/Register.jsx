import React from "react";
import Logo from "../../../assets/UAM/Logos_UAM-07.png";
import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthController from "../../../api/auth";

export const Register = () => {
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};

    //email validation
    if (!values.email) {
      errors.email = "Este campo es requerido";
    } else if (!/^[A-Z0-9._%+-]+@autonoma\.edu\.co$/i.test(values.email)) {
      errors.email = "Correo inválido, debe ser dominio @autonoma";
    }

    //pasword validation
    if (!values.password) {
      errors.password = "Este campo es requerido";
    } else if (values.password.length < 8) {
      errors.password = "La contraseña debe tener más de 8 dígitos";
    }

    // repassword validation
    if (!values.repassword) {
      errors.repassword = "Este campo es requerido";
    } else if (values.password !== values.repassword) {
      errors.repassword = "Las contraseñas no coinciden";
    }

    //name validation
    if (!values.name) {
      errors.name = "Este campo es requerido";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/.test(values.name)) {
      errors.name = "El nombre solo contiene letras";
    }

    //lastname validation
    if (!values.lastname) {
      errors.lastname = "Este campo es requerido";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/.test(values.lastname)) {
      errors.lastname = "El apellido solo contiene letras";
    }

    // id validation
    if (!values.id) {
      errors.id = "Este campo es requerido";
    } else if (!/^[0-9]+$/.test(values.id)) {
      errors.id = "La identificación es con números";
    }

    // checkbox validation
    if (!values.terms) {
      errors.terms = "Debes aceptar los términos y condiciones";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      lastname: "",
      repassword: "",
      id: "",
      terms: false,
    },
    validate,
    onSubmit: async (values) => {
      let data = {
        email: values.email,
        name: values.name,
        last_name: values.lastname,
        id_card: values.id,
        password: values.password,
        institution_id: 1,
        code: "XYZ123",
      };

      try {
        const response = await AuthController.register(data);
        console.log("response ", response);
        
        if (response.data.is_active) {
          console.log("register exitoso", response);
          message.success('Registro exitoso');
          navigate("/");
        } 
      } catch (error){
        if (error.status === 400) {
          message.error('Este usuario ya existe. Inicia sesión');
        } else {
          message.error(error.response.data.message);
        }
      }
    },
  });
  return (
    <div className="register">
      <img src={Logo} className="register__logo" />
      <h2 className="register__title">Regístrate en Rescate UAM</h2>
      <form onSubmit={formik.handleSubmit} className="register__form">
        <Row gutter={16} className="register__inputs">
          <Col>
            <Input
              placeholder="Correo UAM"
              className="register__input"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="register__error">{formik.errors.email}</div>
            ) : null}
          </Col>
          <Col>
            <Input
              placeholder="Nombre"
              className="register__input"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="register__error">{formik.errors.name}</div>
            ) : null}
          </Col>
        </Row>
        <Row gutter={16} className="register__inputs">
          <Col>
            <Input.Password
              placeholder="Contraseña"
              className="register__input"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="register__error">{formik.errors.password}</div>
            ) : null}
          </Col>
          <Col>
            <Input
              placeholder="Apellido"
              className="register__input"
              id="lastname"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="register__error">{formik.errors.lastname}</div>
            ) : null}
          </Col>
        </Row>
        <Row gutter={16} className="register__inputs">
          <Col>
            <Input.Password
              placeholder="Repetir Contraseña"
              className="register__input"
              id="repassword"
              name="repassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repassword}
            />
            {formik.touched.repassword && formik.errors.repassword ? (
              <div className="register__error">{formik.errors.repassword}</div>
            ) : null}
          </Col>
          <Col>
            <Input
              placeholder="Cédula/Tarjeta Identidad"
              className="register__input"
              id="id"
              name="id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
            />
            {formik.touched.id && formik.errors.id ? (
              <div className="register__error">{formik.errors.id}</div>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col span={24} className="register__inputs">
            <Checkbox
              name="terms"
              checked={formik.values.terms}
              onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
              onBlur={formik.handleBlur}
            >
              Aceptar{" "}
              <Link className="register__terms">términos y condiciones</Link>
            </Checkbox>
            {formik.touched.terms && formik.errors.terms ? (
              <div className="register__error">{formik.errors.terms}</div>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col span={24} className="register__inputs">
            <Button
              htmlType="submit"
              className="register__button"
              type="submit"
            >
              Aceptar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="register__inputs">
            <Link to="/" className="register__text">
              Iniciar sesión
            </Link>
          </Col>
        </Row>
      </form>
    </div>
  );
};
