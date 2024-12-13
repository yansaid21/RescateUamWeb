import "./CreateProtocol.css";
import { useFormik } from "formik";
import { Button, Form, Input } from "antd";
import ProtocolsController from "../../../api/protocols";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "../Editor/Editor";
import { notification } from "antd";

export const CreateProtocol = () => {
  const { id_risk_situation } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

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
        const response = await ProtocolsController.createRiskSituation(
          {
            name: values.name,
            content: values.content,
          },
          id_risk_situation
        );
        formik.resetForm();
        api.success({
          message: "Protocolo creado",
          description: "Da click aquí para ver el protocolo",
          style: {
            cursor: "pointer",
          },
          onClick: () => {
            navigate(
              `/risk-sitiation/${id_risk_situation}/show-protocol/${response.data.id}`
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

  return (
    <>
      {contextHolder}
      <main className="protocol">
        <h2 className="protocol__title">¡Añadir protocolo!</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div>
            <Form.Item>
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
              editable={true}
              onChangeData={(data) => {
                formik.setFieldValue("content", data);
              }}
              placeholder="Escribe aquí tu protocolo"
            />
          </div>
        </form>
      </main>
    </>
  );
};
