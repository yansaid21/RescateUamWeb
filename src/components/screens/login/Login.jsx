import React, { useState } from "react";
import "./Login.css";
import Logo from "../../../assets/UAM/Logos_UAM-07.png";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import UserController from "../../../api/user";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { userStore } from "../../../store/user";
import CryptoJS from "crypto-js";
import { ENV, SECRET_KEY } from "../../../utils/constants";
import { echoStore } from "../../../store/echo";
import { axiosInstance } from "../../../config/axiosInstance";
import { routeFromRole } from "../../../config/protectedRoutes";
import AuthController from "../../../api/auth";
import { institutionStore } from "../../../store/institution";
import InstitutionsController from "../../../api/institution";

export const Login = () => {
  const { setInstitution } = institutionStore();
  const setUser = userStore((state) => state.setUser);
  const setRole = userStore((state) => state.setRole);
  const { initEcho } = echoStore();

  const handleSetUser = (newUser, role) => {
    console.log("entrando al handlesetUser en login");
    setUser(newUser);
    setRole(role);
    console.log("user seteado en login");
  };
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Este campo es requerido";
    } else if (!/^[A-Z0-9._%+-]+@autonoma\.edu\.co$/i.test(values.email)) {
      errors.email = "Correo inválido, debe ser dominio @autonoma";
    }
    if (!values.password) {
      errors.password = "Este campo es requerido";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      const data = {
        email: values.email,
        password: values.password,
        device_name: "browser",
      };

      try {
        const response = await AuthController.login(data);

        console.log("response en login ", response);
        console.log("response.user en login ", response.user);
        const rawRole = await UserController.getProfile(
          response.token,
          ENV.INSTITUTION_ID
        );
        const role = rawRole.data.role.id;

        console.log("role en login ", role);

        handleSetUser(response.user, role);
        console.log("user seteado en login");

        if (response.token) {
          console.log("Login exitoso", response);
          localStorage.setItem(
            "google",
            CryptoJS.AES.encrypt(response.token, SECRET_KEY).toString()
          );
          // set axios instance headers
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.token}`;
          initEcho(response.token);
          const institution = await InstitutionsController.getInstitution(
            ENV.INSTITUTION_ID
          );
          setInstitution(institution.data);
          if (routeFromRole.has(role)) {
            navigate(routeFromRole.get(role));
          }
        } else if (response.status === 422) {
          console.log("Error de login", response);
          alert("Contraseña incorrecta. Inténtalo de nuevo.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
          } else {
            alert(
              "Error durante el inicio de sesión. Por favor, intenta más tarde."
            );
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="content">
      <img src={Logo} className="content__logo" />
      <h2 className="content__title">Bienvenido a Rescate UAM</h2>
      <form
        className="content__form"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Form.Item>
          <Input
            placeholder="Correo"
            className="content__input"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="content__error">{formik.errors.email}</div>
          ) : null}
        </Form.Item>
        <Form.Item>
          <Input.Password
            placeholder="Contraseña"
            className="content__input"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="content__error">{formik.errors.password}</div>
          ) : null}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="content__button">
            Aceptar
          </Button>
        </Form.Item>
      </form>
      <Link className="content__text" to="/register">
        Registrarse
      </Link>
    </div>
  );
};
