import React, { useEffect, useState } from 'react';
import './MeetPointList.css';
import { Button,  Table } from 'antd';
import { Link } from 'react-router-dom';
import { CreateMeetPoint } from '../CreateMeetPoint/CreateMeetPoint';
import { MeetPoints } from '../../../api/meet_points';

const meetPointController = new MeetPoints();

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
    },
    {
        title: 'Zona',
        dataIndex: 'zona',
        render: (zones) => Array.isArray(zones) ? zones.map(zone => zone.name).join(', ') : zones,
    },
    {
        title: 'Descripción',
        dataIndex: 'descripción',
    },
];

export const MeetPointList = () => {
    const [bordered, setBordered] = useState(true);
    const [hasData, setHasData] = useState(true);
    const [yScroll, setYScroll] = useState(false);
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [showCreateMeetPoint, setShowCreateMeetPoint] = useState(false);
    const [meetPoints, setMeetPoints] = useState([]); // Para almacenar los puntos de encuentro
    const [loading, setLoading] = useState(false);

    const fetchMeetPoints = async () => {
        setLoading(true);
        try {
            const token = await localStorage.getItem('token');
            const listMeetPoint = await meetPointController.getMeetPoints(token, 1);
            const formattedData = listMeetPoint.data.map((meetPoint, index) => ({
                key: index,
                nombre: meetPoint.name, 
                zona: meetPoint.zones,
                descripción: meetPoint.description, 
            }));
            setMeetPoints(formattedData); 
        } catch (error) {
            console.error("Error fetching meet points:", error);
            setLoading(false); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeetPoints();
    }, []);

    const tableProps = {
        bordered,
        pagination: { position: [top, bottom] },
        scroll: yScroll ? { y: 240 } : undefined,
    };

    const handleAddMeetPoint = () => {
        setShowCreateMeetPoint(true); // Cambia el estado para mostrar el componente
    };

    return (
        <>
            <div className='listmeetpoint'>
                <h2>Puntos de encuentro</h2>
                <Table
                    {...tableProps}
                    pagination={{
                        position: [top, bottom],
                    }}
                    columns={columns}
                    dataSource={hasData ? meetPoints: []} 
                    bordered={bordered}
                    loading={loading} 
                    className='listmeetpoint__table'
                />
                <Button className='listmeetpoint__button' onClick={handleAddMeetPoint}>
                    Añadir puntos de encuentro
                </Button>
                {showCreateMeetPoint && <CreateMeetPoint onClose={() => setShowCreateMeetPoint(false)}/>}
            </div>
        </>
    )
}

