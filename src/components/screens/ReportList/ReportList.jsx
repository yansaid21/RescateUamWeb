import React, { useEffect, useState } from 'react'
import './ReportList.css';
import { Button, Input, Space, Table } from 'antd';
import { Incidents } from '../../../api/incidents';

const incidentController = new Incidents();

const columns = [
    {
        title: 'Situación de riesgo',
        dataIndex: 'incidente',
    },
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),
    },
    {
        title: 'Hora INICIO - FIN',
        dataIndex: 'hora',
    },
];

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export const ReportList = () => {
    const [bordered, setBordered] = useState(true);
    const [hasData, setHasData] = useState(true); //datos de la tabla
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [yScroll, setYScroll] = useState(false);
    const [incidentsData, setIncidentsData] = useState([]);
    const [loading, setLoading] = useState(false);
    //filtro
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchIncidents = async () => {
        setLoading(true);
        try {
            const token = await localStorage.getItem('token'); 
            const response = await incidentController.getIncidents(token, 1);
            console.log("Incidents fetched:", response);
            const formattedData = response.data.map((incident, index) => ({
                key: index,
                incidente: incident.risk_situation.name, 
                fecha: incident.initial_date.split(' ')[0],
                hora: `${incident.initial_date.split(' ')[1]} - ${incident.final_date.split(' ')[1]}`, 
            }));
            setIncidentsData(formattedData);
            setFilteredData(formattedData);
        } catch (error) {
            console.error("Error al obtener los incidentes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = incidentsData.filter(item => 
            item.incidente.toLowerCase().includes(value.toLowerCase()) || 
            item.fecha.includes(value)
        );
        setFilteredData(filtered);
    };

    const tableProps = {
        bordered,
        rowSelection: { type: 'radio' },
        pagination: incidentsData.length > 5 ? { pageSize: 5, position: [top, bottom] } : false,
        scroll: yScroll ? { y: 240 } : undefined,
    };
    return (
        <>
            <div className='listreport'>
                <h2>Lista de incidentes</h2>
                <Space direction="vertical">
                    <Search
                        placeholder="Buscar por situación"
                        onSearch={handleSearch}
                        className='listreport__search'
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
                    />
                </Space>
                <Table
                    {...tableProps}
                    columns={columns}
                    dataSource={hasData ? filteredData : []}
                    loading={loading}
                    className='listreport__table'
                />
                <Button className='listreport__button'>
                    Ver info
                </Button>
            </div>
        </>
    )
}

