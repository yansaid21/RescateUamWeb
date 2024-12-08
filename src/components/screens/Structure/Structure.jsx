import React, { useEffect, useState } from 'react';
import './Structure.css';
import { Button, Input, Select, Space, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import  InstitutionsController  from '../../../api/institution';
import  ZonesControllers from '../../../api/zones';
import { CreateZones } from '../CreateZones/CreateZones';
import  RoomsController from '../../../api/rooms';
import { ENV } from '../../../utils/constants';
import { CreateRoom } from '../CreateRoom/CreateRoom';
import ZonesController from '../../../api/zones';
import { CreateLevel } from '../CreateLevel/CreateLevel';


const columns = [
    {
        title: 'Salón',
        dataIndex: 'name',
    },
    {
        title: 'Código',
        dataIndex: 'code',
        //sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),
    },
    {
        title: 'Piso/Nivel',
        dataIndex: 'level',
    },
    {
        title: 'Descripción',
        dataIndex: 'description',
    },
];

export const Structure = () => {
    //table props
    const [bordered, setBordered] = useState(true);
    const [hasData, setHasData] = useState(true); //datos de la tabla
    const [yScroll, setYScroll] = useState(false);
    const [loading, setLoading] = useState(false);

    //institutions props
    const [institutionName, setInstitutionName] = useState('');
    const [institutionDescription, setInstitutionDescription] = useState('');

    //zones props
    const [zones, setZones] = useState([]);
    const [showCreateZones, setShowCreateZones] = useState(false);

    //rooms props
    const [rooms, setRooms] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);
    const [showCreateRoom, setShowCreateRoom] = useState(null);

    //levels props
    const [showCreateLevels, setShowCreateLevels] = useState(false);

    const tableProps = {
        bordered,
        //pagination: incidentsData.length > 5 ? { pageSize: 5, position: [top, bottom] } : false,
        scroll: yScroll ? { y: 240 } : undefined,
    };

    //obtener info de la institución
    const infoInstitution = async () => {
        
            try{
                const institution = await InstitutionsController.getInstitution(ENV.INSTITUTION_ID);
                //console.log('institution data structure ', institution.data);
                setInstitutionName(institution.data.name);
                setInstitutionDescription(institution.data.description);
            } catch(error) {
                console.error('Error fetching institution data:', error);
            }
         
        
    }

    //obtener las zonas
    const getZonesInstitution = async () => {
            try{
                const zones = await ZonesController.getZones(ENV.INSTITUTION_ID);
                //console.log('zone data structure ', zones.data);
                setZones(zones.data);
            } catch(error) {
                console.error('Error fetching zones data:', error);
            }
        
    }

    //crear las zonas
    const handleAddZone = () => {
        setShowCreateZones(true);
    };

    const handleZoneChange = (value) => {
        if (value === "addZone") {
            handleAddZone();
        } else {
            setSelectedZone(value); // Actualiza correctamente el estado
        }
    };
    
    //obtener los salones
    const fetchRooms = async (zoneId) => {
        setLoading(true);
        try {
            const listRooms = await RoomsController.getRooms( ENV.INSTITUTION_ID, zoneId);
            const formattedData = listRooms.data.map((room, index) => ({
                key: index,
                name: room.name, 
                code: room.code,
                level: room.level.name,
                description: room.description, 
            }));
            setRooms(formattedData); 
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setRooms([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        infoInstitution();
        getZonesInstitution();
        if (selectedZone) {
            fetchRooms(selectedZone); // Llamar solo si hay una zona seleccionada
        } else {
            setRooms([]); // Limpia los datos si no hay zona seleccionada
        }
    }, [selectedZone]);

    //crear salones
    const handleAddRooms = () => {
        setShowCreateRoom(true);
    };

    const handleOpenCreateZone = () => {
        setShowCreateRoom(false);
        setShowCreateZones(true);
        setShowCreateLevels(false);
    };

    const handleOpenCreateLevel = () => {
        setShowCreateRoom(false);
        setShowCreateZones(false);
        setShowCreateLevels(true);
    };

    return (
        <div className='structure-content'>
            <div className='title'>
                <h2>Institución</h2>
            </div>
            <div className='structure'>
            {showCreateZones ? (
                    <CreateZones
                        onClose={() => setShowCreateZones(false)} 
                    />
                ) : showCreateLevels ? (
                    <CreateLevel onClose={() => setShowCreateLevels(false)} />
                ) : (
                    <>
                    <div className='structure__section'>
                        <Input 
                            placeholder={institutionName} 
                            suffix={<EditOutlined className='input-icon'/>} 
                            className='structure__input custom-placeholder'
                        />
                        <div className="textarea-container">
                            <TextArea
                                rows={6}
                                placeholder={institutionDescription}
                                maxLength={100}
                                className="structure__textarea"
                            />
                            <EditOutlined className="textarea-icon" />
                        </div>
                        <Space wrap>
                            <Select
                                placeholder="Zona"
                                className='structure__select'
                                id="zone"
                                name="zone"
                                onChange={handleZoneChange} 
                                >
                                {zones.map((zone) => (
                                    <Select.Option key={zone.id} value={zone.id}>
                                        {zone.name}
                                    </Select.Option>
                                ))}
                                <Select.Option value="addZone" style={{ color: '#007BFF', fontWeight: 'bold' }}>
                                    + Añadir Zona
                                </Select.Option>
                            </Select>
                        </Space>
                    </div>
                    <div className='structure__section'>
                    <Table
                        {...tableProps}
                        columns={columns}
                        dataSource={rooms} // Directamente basado en 'rooms'
                        loading={loading}
                        className='rooms__table'
                        locale={{
                            emptyText: selectedZone ? 'No hay salones disponibles' : 'Por favor seleccione una zona',
                        }}
                    />
                        <Button className='structure__button' onClick={handleAddRooms}>
                            Añadir salón
                        </Button>
                        {showCreateRoom && (
                        <CreateRoom
                            onClose={() => setShowCreateRoom(false)}
                            onAddZone={handleOpenCreateZone}
                            onAddLevel={handleOpenCreateLevel}
                        />
                        )}
                    </div>
                </>
            )}
            </div>
        </div>
    )
}

