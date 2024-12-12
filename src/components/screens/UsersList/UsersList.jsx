import React, { useEffect, useState } from "react";
import "./UsersList.css";
import {  Table } from "antd";
import UserController from "../../../api/user";
import { ENV } from "../../../utils/constants";
import { Checkbox, message } from 'antd';
import BrigadistsController from "../../../api/brigadists";
import AdminsController from "../../../api/admins";


const UsersList = () => {
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
      render: (brigadist, record) => (
        <Checkbox
          checked={brigadist}
          onChange={(e) => brigadistChange(e, record.id, brigadist)}
        />
      ),
    },
    {
      title: "Admin",
      dataIndex: "Admin",
      render: (admin, record) => (
        <Checkbox
          checked={admin}
          onChange={(e) => adminChange(e, record.id, admin)}
        />
      ),
    },
  ];
  const [bordered, setBordered] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [yScroll, setYScroll] = useState(false);
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [users, setUsers] = useState([]);
  // Función para cambiar el rol de brigadista
  const brigadistChange = async (e, userId, brigadist) => {
   /*  console.log(userId, "lo que llega en userId"); */
  const user = users.find((user) => user.id === userId);
  if (user.Admin === true) {
    message.error("Usuario es admin, no se puede cambiar el rol");
    return;
  }
   
    try {
      if (brigadist === true ) {
        
        await BrigadistsController.quitBrigadistRole(userId);
        message.success("Usuario quitado de los brigadistas");
      } else {
        await BrigadistsController.setBrigadistRole(userId);
        message.success("Usuario añadido a los brigadistas");

      }
      // Recargar los datos después de cambiar el estado
      await fetchUsers();
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
    }
  };
  // Función para poner el rol de admin
  const adminChange = async (e, userId, admin) => {
    console.log(userId, "lo que llega en userId");
    try {
      if (admin === false) {
        await AdminsController.setAdminRole(userId);
      } else {
       return
      }
      // Recargar los datos después de cambiar el estado
      await fetchUsers();
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
    }
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
        id: user.id,
        key: index,
        Identity: user.id_card,
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