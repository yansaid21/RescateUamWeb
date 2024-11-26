import { ENV } from "../../../utils/constants";
import TableWithSocket from "../../molecules/TableWithSocket/TableWithSocket";
import BrigadistsController from "../../../api/brigadists";
import { institutionStore } from "../../../store/institution";
import "./BrigadistTable.css";

// This list describe the columns that the table will have.
const brigadistColumns = [
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
    title: "Número de teléfono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Punto de encuentro",
    dataIndex: "meetPoint",
    key: "meetPoint",
  },
];

const BrigadistsTable = ({ className, size }) => {
  const { incident } = institutionStore();
  async function syncBrigadists(tableParams) {
    try {
      const { data: brigadists, pagination: dataPagination } =
        await BrigadistsController.getActiveBrigadists(
          ENV.INSTITUTION_ID,
          incident.risk_situation_id,
          incident.id,
          {
            page: tableParams.pagination.current,
            perPage: tableParams.pagination.pageSize,
          },
        );

      const newDataSource = brigadists.map((brigadist) => {
        return {
          key: brigadist.id,
          name: brigadist.name,
          email: brigadist.email,
          phone: brigadist.phone_number,
          meetPoint: brigadist.meet_point.name,
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
      <h1 className="table-title">Brigadistas activos</h1>
      <TableWithSocket
        size={size}
        channel={`public-channel.${ENV.INSTITUTION_ID}`}
        event={`.brigadierAssignment`}
        columns={brigadistColumns}
        syncDataSource={syncBrigadists}
        initialPage={1}
        pageSize={15}
        emptyText="No hay brigadistas asignados a un punto de encuentro"
      />
    </section>
  ) : (
    <h1>NO ACTIVE INCIDENT</h1>
  );
};

export default BrigadistsTable;
