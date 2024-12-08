import React, { useEffect, useState } from 'react';
import './CreateRoom.css';
import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import RoomsController from '../../../api/rooms';
import { ENV } from '../../../utils/constants';
import ZonesController from '../../../api/zones';
import { CreateZones } from '../CreateZones/CreateZones';
import LevelsController from '../../../api/levels';
import { CreateLevel } from '../CreateLevel/CreateLevel';

export const CreateRoom = ({ onClose, onAddZone, onAddLevel }) => {
    //traer las zonas
    const [zones, setZones] = useState([{ id: 1, name: "Zona 1" }]);
    useEffect(() => {
        const getZones = async () => {
            try {
                const token = await localStorage.getItem("token");
                console.log("token ", token);
        
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

    //traer niveles
    useEffect(() => {
        const getLevels = async () => {
            try {
                const token = await localStorage.getItem("token");
                console.log("token ", token);
        
                const rawLevels = await LevelsController.getLevels(1);
                const levels = rawLevels.data;
                console.log("levels ", levels);
                setLevels(levels);
            } catch (error) {
                console.log(error);
            }
        };
        getLevels();
    }, []);
    const [levels, setLevels] = useState([{ id: 1, name: "Nivel 1" }]);
    const [showCreateLevel, setShowCreateLevel] = useState(false);

    //validaciones del form
    const validate = (values) => {
        const errors = {};
    
        if (!values.name) {
            errors.name = "Este campo es requerido";
        } else if (!/^[a-zA-Z0-9\s.-áéíóúÁÉÍÓÚñÑ-]+$/.test(values.name)) {
            errors.name = "No acepta caracteres especiales";
        }

        if (!values.code) {
            errors.code = "Este campo es requerido";
        } else if (!/^[a-zA-Z0-9\s.-áéíóúÁÉÍÓÚñÑ-]+$/.test(values.code)) {
            errors.code = "No acepta caracteres especiales";
        }
    
        if (!values.zone) {
            errors.zone = "Seleccione una zona";
        }

        if (!values.level) {
            errors.level = "Seleccione una zona";
        }
    
        if (!values.description) {
            errors.description = "Este campo es requerido";
        } else if (!/^[a-zA-Z0-9\s.-áéíóúÁÉÍÓÚñÑ-]+$/.test(values.description)) {
            errors.description = "No admite caracteres especiales";
        }
        return errors;
    };

    //crear salones
    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            zone: 1,
            level: 1,
            description: "",
        },
        validate,
        onSubmit: async (values) => {
            console.log("values ", values);
            try {
                //const token = await localStorage.getItem("token");
                const roomData = {
                    name: values.name,
                    code: values.code,
                    description: values.description,
                    level_id: Number(values.level)
                };
                console.log('roomData ', roomData);
                const zone_id = Number(values.zone);
                const room = await RoomsController.createRooms(
                    1,
                    zone_id,
                    roomData,
                );
                console.log("room createRooms ", room);
                onClose();
            } catch (error) {
                console.log(error);
            }
        },
    });

    //añadir zonas
    const handleAddZone = () => {
        onAddZone();
    };

    //añadir niveles
    const handleAddLevel = () => {
        console.log('abrir nivel');
        
        onAddLevel();
    };

    return (
        <div className="room">
            <div className="room__content">
                <h2 className="room__title">¡Añadir salón!</h2>
                <form className="form" onSubmit={formik.handleSubmit}>
                <div className="room__form">
                    <Form.Item>
                    <Input
                        placeholder="Nombre"
                        className="form-inputRoom"
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
                    <Input
                        placeholder="Código"
                        className="form-inputRoom"
                        id="code"
                        name="code"
                        onChange={formik.handleChange}
                        value={formik.values.code}
                    />
                    {formik.errors.code ? (
                        <div className="error__text">{formik.errors.code}</div>
                    ) : null}
                    </Form.Item>
                    <Form.Item>
                    <Select
                        placeholder="Zona"
                        className="select"
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
                    <Form.Item>
                    <Select
                        placeholder="Nivel"
                        className="select"
                        id="level"
                        name="level"
                        onChange={(value) => {
                        if (value === "addLevel") {
                            handleAddLevel();
                        } else {
                            formik.setFieldValue("level", value);
                        }
                        }}
                        value={formik.values.level}
                    >
                        {levels.map((level) => (
                        <Select.Option key={level.id} value={level.id}>
                            {level.name}
                        </Select.Option>
                        ))}
                        <Select.Option
                        value="addLevel"
                        style={{ color: "#007BFF", fontWeight: "bold" }}
                        >
                        + Añadir Nivel
                        </Select.Option>
                    </Select>
                    {formik.errors.level ? (
                        <div className="error__text">{formik.errors.level}</div>
                    ) : null}
                    {showCreateLevel && (
                        <CreateLevel onClose={() => setShowCreateLevel(false)} />
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
                <div className="btnroom">
                    <Button
                    htmlType="submit"
                    className="form__buttonroom"
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
    )
}

