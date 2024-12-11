import React, { useEffect, useState } from 'react'
import './BrigadierList.css';
import { Card, Avatar, Pagination, Typography, List } from "antd";
import UserController from '../../../api/user';
const { Title, Text } = Typography;

export const BrigadierList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [brigadierList, setBrigadierList] = useState([]);
    const SERVER_IP = "rescueapi.xyz";
    const pageSize = 1;

    //obtener los brigadistas de la institución
    const getBrigadiers = async () => {
        try {
            const list = await UserController.getUsers(1);
            console.log('Resultado de getUsers:', list.data);
            const brigList = list.data.filter(user => user.role.id === 2);
            setBrigadierList(brigList);
        } catch (error){
            console.log('Error en getBrigadiers ', error);
        }
    }

    useEffect(() => {
        getBrigadiers();
    }, []);

    // Calcular los brigadistas a mostrar en la página actual
    const indexOfLastBrigadista = currentPage * pageSize;
    const indexOfFirstBrigadista = indexOfLastBrigadista - pageSize;
    const currentBrigadistas = brigadierList.slice(indexOfFirstBrigadista, indexOfLastBrigadista);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Card
            title={<Title level={2} style={{ textAlign: "center" }}>Brigadistas</Title>}
            style={{ width: "100%", maxWidth: 800, margin: "20px auto" }}
        >
            <List
                itemLayout="vertical"
                dataSource={currentBrigadistas}
                renderItem={(brigadista) => (
                    <List.Item>
                        <div style={{ textAlign: "center", marginBottom: 20 }}>
                            <Avatar
                                size={100}
                                src={brigadista.photo_path ? `https://${SERVER_IP}${brigadista.photo_path}` : null}
                                alt={brigadista.name}
                                style={{ marginBottom: 10 }}
                            />
                            <Title level={4}>{brigadista.name}</Title>
                            <Text type="secondary">{brigadista.email}</Text>
                        </div>
                    </List.Item>
                )}
            />
            <div style={{ textAlign: "center", marginTop: 20}}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={brigadierList.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </Card>
    )
}

