import React, { useEffect, useState } from 'react';
import './Structure.css';
import { Button, Input, Select, Space, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { Institution } from '../../../api/institution';
import { Zones } from '../../../api/zones';
import { CreateZones } from '../CreateZones/CreateZones';
import { Rooms } from '../../../api/rooms';

const institutionController = new Institution(); 
const zonesController = new Zones();
const roomsController = new Rooms();

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

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
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

    const tableProps = {
        bordered,
        //pagination: incidentsData.length > 5 ? { pageSize: 5, position: [top, bottom] } : false,
        scroll: yScroll ? { y: 240 } : undefined,
    };

    //obtener info de la institución
    const infoInstitution = async () => {
        const token = localStorage.getItem('token');
        const id_institution = 1;
        if (token && id_institution){
            try{
                const institution = await institutionController.getInstitution(token, id_institution);
                //console.log('institution data structure ', institution.data);
                setInstitutionName(institution.data.name);
                setInstitutionDescription(institution.data.description);
            } catch(error) {
                console.error('Error fetching institution data:', error);
            }
            
        }
    }

    //obtener las zonas
    const getZonesInstitution = async () => {
        const token = localStorage.getItem('token');
        const id_institution = 1;
        if (token && id_institution){
            try{
                const zones = await zonesController.getZones(token, id_institution);
                //console.log('zone data structure ', zones.data);
                setZones(zones.data);
            } catch(error) {
                console.error('Error fetching zones data:', error);
            }
        }
    }

    //crear las zonas
    const handleAddZone = () => {
        setShowCreateZones(true);
    };

    const handleZoneChange = (value) => {
        if (value === "addZone") {
            handleAddZone(); // Mostrar el formulario de creación de zonas
        } else {
            setSelectedZone(value); // Guardar el ID de la zona seleccionada
        }
    };
    
    //obtener los salones
    const fetchRooms = async (zoneId) => {
        setLoading(true);
        try {
            const token = await localStorage.getItem('token');
            const listRooms = await roomsController.getMeetPoints(token, 1, zoneId);
            const formattedData = listRooms.data.map((room, index) => ({
                key: index,
                nombre: room.name, 
                code: room.code,
                level: room.level.name,
                description: room.description, 
            }));
            setRooms(formattedData); 
        } catch (error) {
            console.error("Error fetching rooms:", error);
        } finally {
            setLoading(false);
        }
    };

    //crear los salones
    //createRooms

    useEffect(() => {
        infoInstitution();
        getZonesInstitution();
        if (selectedZone) {
            fetchRooms(selectedZone); // Llamar a la API con el ID de la zona seleccionada
        }
    }, []);

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
                            dataSource={selectedZone ? rooms : []}
                            loading={loading}
                            className='rooms__table'
                            locale={{
                                emptyText: selectedZone ? 'No hay salones disponibles' : 'Por favor seleccione una zona',
                            }}
                        />
                        <Button className='structure__button'>
                            Añadir salón
                        </Button>
                    </div>
                </>
            )}
            </div>
        </div>
    )
}

