import React, { useEffect, useState } from "react";
import "./UsersList.css";
import {  Table } from "antd";
import UserController from "../../../api/user";
import { ENV } from "../../../utils/constants";
import { Checkbox } from 'antd';

const columns = [
  {
    title: "N° identidad",
    dataIndex: "Identity",
  },
  {
    title: "Nombre(s) y Apellido(s)",
    dataIndex: "Names",
    render: (users) =>
      Array.isArray(users) ? users.map((user) => user.name).join(", ") : users,
  },
  {
    title: "Brigadista",
    dataIndex: "Brigadist",
    render: (brigadist) => <Checkbox checked={brigadist} />,
  },
  {
    title: "Admin",
    dataIndex: "Admin",
    render: (admin) => <Checkbox checked={admin} />,
  },
];

const UsersList = () => {
  const [bordered, setBordered] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [yScroll, setYScroll] = useState(false);
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [users, setUsers] = useState([]);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const listUsers = await UserController.getUsers(
        ENV.INSTITUTION_ID,
      );
      console.log(listUsers,"lista de usuarios");
      
      const formattedData = listUsers.data.map((user, index) => ({
        key: index,
        Identity: user.id,
        Names: user.name,
        Brigadist: user.role.id === 1 || user.role.id === 2 ? true : false,
        Admin: user.role.id === 1 ? true : false,
        
      }));
      setUsers(formattedData);
    } catch (error) {
      console.error("Error fetching meet points:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const tableProps = {
    bordered,
    pagination: { position: [top, bottom] },
    scroll: yScroll ? { y: 240 } : undefined,
  };


  return (
    <>
      <div className="listmeetpoint">
        <h2>Lista Comunidad UAM</h2>
        <Table
          {...tableProps}
          columns={columns}
          dataSource={hasData ? users : []}
          bordered={bordered}
          loading={loading}
          className="listmeetpoint__table"
        />
      </div>
    </>
  );
};
export default UsersList;