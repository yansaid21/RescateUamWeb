import { ENV } from "../../../utils/constants";
import TableWithSocket from "../../molecules/TableWithSocket/TableWithSocket";
import UserReportsController from "../../../api/userReports";
import ReportInfoModal, {
  stateColors,
  resolutionColors,
} from "../../molecules/ReportInfoModal/ReportInfoModal";
import CloseReportModal from "../../molecules/CloseReportModal/CloseReportModal.jsx";
import { institutionStore } from "../../../store/institution";
import "./UserReportsTable.css";
import { CloseCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Tag, Tooltip } from "antd";
import { userStore } from "../../../store/user";

const UserReportsTable = ({ className, size }) => {
  const { user } = userStore();
  const { incident } = institutionStore();
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [showReportInfoModal, setShowReportInfoModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // This list describe the columns that the table will have.
  const userReportColumns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Número de telefono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      filters: [
        {
          text: "Safe",
          value: "safe",
        },
        {
          text: "At risk",
          value: "at_risk",
        },
        {
          text: "Outside",
          value: "outside",
        },
      ],
      render: (state) => (
        <Tag color={stateColors[state]} key={state}>
          {state.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Resolución",
      dataIndex: "resolution",
      key: "resolution",
      filters: [
        {
          text: "No Hay",
          value: "not",
        },
        {
          text: "safe",
          value: "safe",
        },
        {
          text: "at_risk",
          value: "at_risk",
        },
        {
          text: "dead",
          value: "dead",
        },
      ],
      render: (resolution) => (
        <Tag
          color={resolution ? resolutionColors[resolution] : "default"}
          key={resolution}
        >
          {resolution ? resolution.toUpperCase() : "NO HAY"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, record) => {
        return (
          <div>
            <Tooltip title="Cerrar reporte">
              <Button
                icon={<CloseCircleOutlined />}
                disabled={
                  record.state !== "at_risk" ||
                  record.resolution ||
                  user.id == record.userId
                }
                onClick={() => {
                  setSelectedReport(record);
                  setShowResolutionModal(true);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Mirar detalles">
              <Button
                icon={<InfoCircleOutlined />}
                onClick={() => {
                  setSelectedReport(record);
                  setShowReportInfoModal(true);
                }}
              ></Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  async function syncUserReports(tableParams, searchValue = null) {
    try {
      const { data: userReports, pagination: dataPagination } =
        await UserReportsController.getUserReports(
          ENV.INSTITUTION_ID,
          incident.risk_situation_id,
          incident.id,
          {
            page: tableParams.pagination.current,
            perPage: tableParams.pagination.pageSize,
            orderBy: tableParams.sortField,
            order: tableParams.sortOrder,
            filters: tableParams.filters,
            searchValue,
          },
        );
      console.log("userReport", userReports[0]);
      const newDataSource = userReports.map((userReport) => {
        return {
          key: userReport.id,
          userId: userReport.user?.id,
          name: userReport.user?.name,
          description: userReport.description,
          email: userReport.user?.email,
          phone: userReport.user?.phone_number,
          state: userReport.state,
          resolution: userReport.resolution?.state ?? null,
          resolutionDescription: userReport.resolution?.description ?? null,
        };
      });

      const newTableParams = {
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          current: dataPagination.current_page,
          pageSize: dataPagination.per_page,
          total: dataPagination.total,
        },
      };
      return { newDataSource, newTableParams };
    } catch (error) {
      console.error(error);
      return { newDataSource: [], newTableParams: tableParams };
    }
  }

  return incident ? (
    <>
      <section className={className}>
        <h1 className="table-title">Reportes de usuario</h1>
        <TableWithSocket
          size={size}
          channel={`privileged-channel.${ENV.INSTITUTION_ID}`}
          event={`.userReportChange`}
          columns={userReportColumns}
          syncDataSource={syncUserReports}
          initialPage={1}
          pageSize={15}
          emptyText="No hay Reportes de usuario"
        />
      </section>
      <CloseReportModal
        report={selectedReport}
        open={showResolutionModal}
        onCancel={() => {
          setShowResolutionModal(false);
          setSelectedReport(null);
        }}
      />
      <ReportInfoModal
        report={selectedReport}
        open={showReportInfoModal}
        onCancel={() => {
          setShowReportInfoModal(false);
          setSelectedReport(null);
        }}
      />
    </>
  ) : (
    <h1>NO ACTIVE INCIDENT</h1>
  );
};

export default UserReportsTable;
