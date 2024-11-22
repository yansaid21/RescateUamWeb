import React, { useEffect, useState } from "react";
import "./MeetPointList.css";
import { Button, Table } from "antd";
import { CreateMeetPoint } from "../CreateMeetPoint/CreateMeetPoint";
import { CreateZones } from "../CreateZones/CreateZones";
import MeetPointsController from "../../../api/meet_points";
import { ENV } from "../../../utils/constants";

const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
  },
  {
    title: "Zona",
    dataIndex: "zona",
    render: (zones) =>
      Array.isArray(zones) ? zones.map((zone) => zone.name).join(", ") : zones,
  },
  {
    title: "Descripción",
    dataIndex: "descripción",
  },
];

export const MeetPointList = () => {
  const [bordered, setBordered] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [yScroll, setYScroll] = useState(false);
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [showCreateMeetPoint, setShowCreateMeetPoint] = useState(false);
  const [showCreateZone, setShowCreateZone] = useState(false);
  const [meetPoints, setMeetPoints] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeetPoints = async () => {
    setLoading(true);
    try {
      const listMeetPoint = await MeetPointsController.getMeetPoints(
        ENV.INSTITUTION_ID,
      );
      const formattedData = listMeetPoint.data.map((meetPoint, index) => ({
        key: index,
        nombre: meetPoint.name,
        zona: meetPoint.zones,
        descripción: meetPoint.description,
      }));
      setMeetPoints(formattedData);
    } catch (error) {
      console.error("Error fetching meet points:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetPoints();
  }, []);

  const handleOpenCreateZone = () => {
    setShowCreateMeetPoint(false);
    setShowCreateZone(true);
  };

  const tableProps = {
    bordered,
    pagination: { position: [top, bottom] },
    scroll: yScroll ? { y: 240 } : undefined,
  };

  const handleAddMeetPoint = () => {
    setShowCreateMeetPoint(true);
  };

  return (
    <>
      <div className="listmeetpoint">
        <h2>Puntos de encuentro</h2>
        <Table
          {...tableProps}
          columns={columns}
          dataSource={hasData ? meetPoints : []}
          bordered={bordered}
          loading={loading}
          className="listmeetpoint__table"
        />
        <Button className="listmeetpoint__button" onClick={handleAddMeetPoint}>
          Añadir puntos de encuentro
        </Button>
        {showCreateMeetPoint && (
          <CreateMeetPoint
            onClose={() => setShowCreateMeetPoint(false)}
            onAddZone={handleOpenCreateZone}
          />
        )}
        {showCreateZone && (
          <CreateZones onClose={() => setShowCreateZone(false)} />
        )}
      </div>
    </>
  );
};
