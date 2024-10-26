import React, { useState } from 'react'
import './ReportList.css';
import { Button, Input, Space, Table } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Incidente',
        dataIndex: 'incidente',
    },
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Hora INICIO - FIN',
        dataIndex: 'hora',
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

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export const ReportList = () => {
    const [bordered, setBordered] = useState(true);
    const [hasData, setHasData] = useState(true); //datos de la tabla
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [yScroll, setYScroll] = useState(false);
    const [rowSelection, setRowSelection] = useState({
        type: 'radio', // Cambia el tipo de selección a radio
    });

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
        rowSelection
    };
    return (
        <>
            <div className='listreport'>
                <h2>Lista de incidentes</h2>
                <Space direction="vertical">
                    <Search
                        placeholder=""
                        onSearch={onSearch}
                        className='listreport__search'
                    />
                </Space>
                <Table
                    {...tableProps}
                    pagination={{
                        position: [top, bottom],
                    }}
                    columns={tableColumns}
                    dataSource={hasData ? data : []}
                    scroll={scroll}
                    className='listreport__table'
                />
                <Button className='listreport__button'>
                    Ver info
                </Button>
            </div>
        </>
    )
}

