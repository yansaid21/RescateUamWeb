import "./EditProtocol.css";
import { useFormik } from "formik";
import { Button, Form, Input } from "antd";
import ProtocolsController from "../../../api/protocols";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "../Editor/Editor";
import { notification } from "antd";
import { useEffect, useState } from "react";

export const EditProtocol = () => {
  const { id_risk_situation, id_protocol } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [protocol, setProtocol] = useState({});
  const [loading, setLoading] = useState(true);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Este campo es requerido";
    } else if (!/^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(values.name)) {
      errors.name = "No acepta caracteres especiales";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      content: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log("values ", values);
      try {
        let dataPut = null;
        if (protocol.content != values.content) {
          dataPut = {
            name: values.name,
            content: values.content,
          };
        } else {
          dataPut = {
            name: values.name,
          };
        }

        await ProtocolsController.updateRiskSituation(
          dataPut,
          id_risk_situation,
          id_protocol
        );
        api.success({
          message: "Protocolo actualizado",
          description: "Da click aquí para ver el protocolo",
          style: {
            cursor: "pointer",
          },
          onClick: () => {
            navigate(
              `/risk-sitiation/${id_risk_situation}/show-protocol/${id_protocol}`
            );
          },
        });
      } catch (error) {
        // Si es un 422, mostrar mensaje de error
        if (error.response.status === 422) {
          formik.setErrors(error.response.data.errors);
        }
      }
    },
  });

  useEffect(() => {
    const getProtocol = async () => {
      try {
        const response = await ProtocolsController.getProtocol(
          id_risk_situation,
          id_protocol
        );
        setProtocol(response.data);
        formik.setFieldValue("name", response.data.name);
        formik.setFieldValue("content", response.data.content);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProtocol();
  }, [id_risk_situation, id_protocol]);

  return (
    <>
      {contextHolder}
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <main className="protocol">
          <h2 className="protocol__title">¡Editar protocolo!</h2>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div>
              <Form.Item>
                <div
                  style={{
                    marginBottom: "2px",
                    marginLeft: "5px",
                    color: "#0090d0",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  htmlFor="name"
                >
                  Nombre
                </div>
                <Input
                  placeholder="Nombre"
                  className="form__input__protocol"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  style={{ marginBottom: "0" }}
                  styles={{ marginBottom: "0" }}
                />
                {formik.errors.name ? (
                  <div className="error__text">{formik.errors.name}</div>
                ) : null}
              </Form.Item>
            </div>
            <div className="btn__protocol">
              <Button
                htmlType="submit"
                className="form__button__protocol"
                type="submit"
              >
                Aceptar
              </Button>
              <Button
                className="form__button__protocol"
                type="button"
                onClick={() => {
                  // Redirect to protocols-menu
                  navigate("/admin/risks-menu");
                }}
              >
                Cancelar
              </Button>
            </div>
            <div className="editor">
              <Editor
                baseData={protocol.content}
                editable={true}
                onChangeData={(data) => {
                  formik.setFieldValue("content", data);
                }}
              />
            </div>
          </form>
        </main>
      )}
    </>
  );
};
