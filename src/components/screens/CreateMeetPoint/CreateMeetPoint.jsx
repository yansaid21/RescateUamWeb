import React, { useEffect, useState } from "react";
import "./CreateMeetPoint.css";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { Button, Form, Input, message, Select } from "antd";
import MeetPointsController from "../../../api/meet_points";
import { CreateZones } from "../CreateZones/CreateZones";
import ZonesController from "../../../api/zones";
import { ENV } from "../../../utils/constants";

export const CreateMeetPoint = ({ onClose, onAddZone, onMeetPointCreated }) => {
  const [zones, setZones] = useState([{ id: 1, name: "Zona 1" }]);
  useEffect(() => {
    const getZones = async () => {
      try {
        const rawZones = await ZonesController.getZones(1);
        const zones = rawZones.data;
        console.log("zones ", zones);
        setZones(zones);
      } catch (error) {
        console.log(error);
      }
    };
    getZones();
  }, []);
  const [showCreateZone, setShowCreateZone] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Este campo es requerido";
    } else if (!/^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(values.name)) {
      errors.name = "No acepta caracteres especiales";
    }

    if (!values.zone) {
      errors.zone = "Seleccione una zona";
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
      zone: 1,
      description: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log("values ", values);
      try {
        const meetPointData = {
          name: values.name,
          description: values.description,
          zones: [Number(values.zone)],
        };
        const meet_point = await MeetPointsController.createMeetPoint(
          ENV.INSTITUTION_ID,
          meetPointData,
        );
        console.log("meet_point createMeetPoint ", meet_point);
        message.success('Punto de encuentro creado correctamente');
        if (onMeetPointCreated) {
          onMeetPointCreated(); // Notifica a MeetPointList para actualizar
        }
        onClose();
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

  const handleAddZone = () => {
    onAddZone();
  };

  return (
    <div className="meetpoint">
      <div className="meetpoint__content">
        <h2 className="meetpoint__title">¡Añadir punto de encuentro!</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="meetpoint__form">
            <Form.Item>
              <Input
                placeholder="Nombre"
                className="form__inputMeet"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div className="error__text">{formik.errors.name}</div>
              ) : null}
            </Form.Item>
            <Form.Item>
              <Select
                placeholder="Zona"
                className="select-meet"
                id="zone"
                name="zone"
                onChange={(value) => {
                  if (value === "addZone") {
                    handleAddZone();
                  } else {
                    formik.setFieldValue("zone", value);
                  }
                }}
                value={formik.values.zone}
              >
                {zones.map((zone) => (
                  <Select.Option key={zone.id} value={zone.id}>
                    {zone.name}
                  </Select.Option>
                ))}
                <Select.Option
                  value="addZone"
                  id="addNewZone"
                  style={{ color: "#007BFF", fontWeight: "bold" }}
                >
                  + Añadir Zona
                </Select.Option>
              </Select>
              {formik.errors.zone ? (
                <div className="error__text">{formik.errors.zone}</div>
              ) : null}
              {showCreateZone && (
                <CreateZones onClose={() => setShowCreateZone(false)} />
              )}
            </Form.Item>
          </div>
          <TextArea
            className="form__textarea"
            rows={8}
            placeholder="Descripción del incidente"
            maxLength={5000}
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description ? (
            <div className="error__text">{formik.errors.description}</div>
          ) : null}
          <div className="btnmeetpoint">
            <Button
              htmlType="submit"
              className="form__buttonmeetpoint"
              type="submit"
            >
              Aceptar
            </Button>
            <Button
                className="form__buttonmeetpoint"
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
