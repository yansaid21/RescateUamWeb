import React, { useState } from 'react';
import './MeetPointList.css';
import { Button,  Table } from 'antd';
import { Link } from 'react-router-dom';
import { CreateMeetPoint } from '../CreateMeetPoint/CreateMeetPoint';

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
    },
    {
        title: 'Zona',
        dataIndex: 'zona',
    },
    {
        title: 'Descripción',
        dataIndex: 'descripción',
    },
];

const data = Array.from({
    length: 5,
    }).map((_, i) => ({
        key: i,
        name: 'John Brown',
        age: Number(`${i}2`),
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
}));

export const MeetPointList = () => {
    const [bordered, setBordered] = useState(true);
    const [hasData, setHasData] = useState(true); //datos de la tabla
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [yScroll, setYScroll] = useState(false);
    const [showCreateMeetPoint, setShowCreateMeetPoint] = useState(false);

    const scroll = {};

    if (yScroll) {
        scroll.y = 240;
    }

    const tableColumns = columns.map((item) => ({
        ...item,
    }));

    const tableProps = {
        scroll,
        bordered,
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
                    columns={tableColumns}
                    dataSource={hasData ? data : []}
                    scroll={scroll}
                    className='listmeetpoint__table'
                />
                <Button className='listmeetpoint__button' onClick={handleAddMeetPoint}>
                    Añadir puntos de encuentro
                </Button>
                {showCreateMeetPoint && <CreateMeetPoint />}
            </div>
        </>
    )
}

