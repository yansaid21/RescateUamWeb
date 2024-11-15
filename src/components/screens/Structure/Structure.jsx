import React, { useState } from 'react';
import './Structure.css';
import { Button, Input, Select, Space, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

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
        title: 'Descriçión',
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

    const tableProps = {
        bordered,
        //pagination: incidentsData.length > 5 ? { pageSize: 5, position: [top, bottom] } : false,
        scroll: yScroll ? { y: 240 } : undefined,
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='structure-content'>
            <div className='title'>
                <h2>Institución</h2>
            </div>
            <div className='structure'>
                <div className='structure__section'>
                    <Input 
                        placeholder="UAM" 
                        suffix={<EditOutlined className='input-icon'/>} 
                        className='structure__input custom-placeholder'
                    />
                    <div className="textarea-container">
                        <TextArea
                            rows={6}
                            placeholder="Descripción de la institución"
                            maxLength={100}
                            className="structure__textarea"
                        />
                        <EditOutlined className="textarea-icon" />
                    </div>
                    <Space wrap>
                        <Select
                            defaultValue="lucy"
                            className='structure__select'
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Zonas',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Fundadores',
                                },
                            ]}
                        />
                    </Space>
                </div>
                <div className='structure__section'>
                    <Table
                        {...tableProps}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        className='rooms__table'
                    />
                    <Button className='structure__button'>
                        Añadir salón
                    </Button>
                </div>
            </div>
        </div>
    )
}

