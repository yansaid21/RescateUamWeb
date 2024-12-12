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

export const ReportList = () => {
  const [bordered, setBordered] = useState(true);
  const [hasData, setHasData] = useState(true); //datos de la tabla
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [yScroll, setYScroll] = useState(false);
  const [incidentsData, setIncidentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  //filtro
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  //en caso de estar un incidente activo
  const [activeIncident, setActiveIncident] = useState(null);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await IncidentsController.getIncidents(1);
      console.log("Incidents fetched:", response);
      const formattedData = response.data.map((incident, index) => {
        const initialDate = incident.initial_date || ""; // Valor predeterminado
        const finalDate = incident.final_date || ""; // Valor predeterminado
  
        return {
          key: index,
          incidente: incident.risk_situation.name || "N/A", // Manejar posibles nulos
          fecha: initialDate.split(" ")[0] || "Fecha no disponible",
          hora: `${initialDate.split(" ")[1] || "N/A"} - ${finalDate.split(" ")[1] || "N/A"}`,
          initialDate: initialDate ? new Date(initialDate) : null, // Si existe, convertir
        };
      });
      setIncidentsData(formattedData);
      setFilteredData(formattedData);
      // Determinar incidente activo (por ejemplo, el más reciente sin finalizar)
      const active = response.data.find(
        (incident) => !incident.final_date // Si final_date es nulo, significa que está activo
      );
      if (active) {
        setActiveIncident({
          ...active,
          initialDate: new Date(active.initial_date),
        });
      }
    } catch (error) {
      console.error("Error al obtener los incidentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // Filtrar incidentes anteriores al activo
  useEffect(() => {
    if (activeIncident) {
      const filtered = incidentsData.filter(
        (incident) => incident.initialDate < activeIncident.initialDate
      );
      setFilteredData(filtered);
    }
  }, [activeIncident, incidentsData]);

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
            placeholder="Buscar por situación"
            onSearch={handleSearch}
            className="listreport__search"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
          />
        </Space>
        <Table
          {...tableProps}
          columns={columns}
          dataSource={hasData ? filteredData : []}
          loading={loading}
          className="listreport__table"
        />
        <Button className="listreport__button">Ver info</Button>
      </div>
    </>
  );
};
