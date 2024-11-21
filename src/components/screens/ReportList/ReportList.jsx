import React, { useEffect, useState } from "react";
import "./ReportList.css";
import { Button, Input, Space, Table } from "antd";
import IncidentsController from "../../../api/incidents";

const columns = [
  {
    title: "Situación de riesgo",
    dataIndex: "incidente",
  },
  {
    title: "Fecha",
    dataIndex: "fecha",
    sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),
  },
  {
    title: "Hora INICIO - FIN",
    dataIndex: "hora",
  },
];

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export const ReportList = () => {
  const [bordered, setBordered] = useState(true);
  const [hasData, setHasData] = useState(true); //datos de la tabla
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [yScroll, setYScroll] = useState(false);
  const [incidentsData, setIncidentsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const token = await localStorage.getItem("token");
      const response = await IncidentsController.getIncidents(1);
      console.log("Incidents fetched:", response);
      const formattedData = response.data.map((incident, index) => ({
        key: index,
        incidente: incident.risk_situation.name,
        fecha: incident.initial_date.split(" ")[0],
        hora: `${incident.initial_date.split(" ")[1]} - ${incident.final_date.split(" ")[1]}`,
      }));
      setIncidentsData(formattedData);
    } catch (error) {
      console.error("Error al obtener los incidentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const tableProps = {
    bordered,
    rowSelection: { type: "radio" },
    pagination:
      incidentsData.length > 5
        ? { pageSize: 5, position: [top, bottom] }
        : false,
    scroll: yScroll ? { y: 240 } : undefined,
  };
  return (
    <>
      <div className="listreport">
        <h2>Lista de incidentes</h2>
        <Space direction="vertical">
          <Search
            placeholder=""
            onSearch={onSearch}
            className="listreport__search"
          />
        </Space>
        <Table
          {...tableProps}
          columns={columns}
          dataSource={hasData ? incidentsData : []}
          loading={loading}
          className="listreport__table"
        />
        <Button className="listreport__button">Ver info</Button>
      </div>
    </>
  );
};
