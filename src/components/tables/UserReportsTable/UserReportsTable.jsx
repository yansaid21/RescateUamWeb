import { ENV } from "../../../utils/constants";
import TableWithSocket from "../../molecules/TableWithSocket/TableWithSocket";
import UserReportsController from "../../../api/userReports";
import { institutionStore } from "../../../store/institution";
import "./UserReportsTable.css";
import { Button, Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

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
        value: "Safe",
      },
      {
        text: "In risk",
        value: "In risk",
      },
      {
        text: "Out",
        value: "Out",
      },
    ],
  },
  {
    title: "Resolución",
    dataIndex: "resolution",
    key: "resolution",
    filter: true,
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    align: "center",
    render: () => {
      return (
        <Tooltip title="Cerrar reporte">
          <Button icon={<CloseCircleOutlined />}></Button>
        </Tooltip>
      );
    },
  },
];

const UserReportsTable = ({ className, size }) => {
  const { incident } = institutionStore();
  async function syncUserReports(tableParams) {
    try {
      const { data: userReports, pagination: dataPagination } =
        await UserReportsController.getUserReports(
          ENV.INSTITUTION_ID,
          incident.risk_situation_id,
          incident.id,
          {
            page: tableParams.pagination.current,
            perPage: tableParams.pagination.pageSize,
          },
        );

      const newDataSource = userReports.map((userReport) => {
        return {
          key: userReport.id,
          name: userReport.user.name,
          email: userReport.user.email,
          phone: userReport.user.phone_number,
          state: userReport.state,
          resolution: userReport.resolution.state,
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
      return { newDataSource: [], newTableParams: tableParams };
    }
  }

  return incident ? (
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
  ) : (
    <h1>NO ACTIVE INCIDENT</h1>
  );
};

export default UserReportsTable;
