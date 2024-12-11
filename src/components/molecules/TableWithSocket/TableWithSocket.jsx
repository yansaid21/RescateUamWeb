import { Empty, Table } from "antd";
import { useEffect, useState } from "react";
import { echoStore } from "../../../store/echo";

const defaultSyncDataSource = async () => {
  console.log("Default sync data source");
  return [];
};

const defaultListener = async () => {
  console.log("Default listener");
};

const TableWithSocket = ({
  className,
  size,
  title,
  channel,
  event,
  syncDataSource = defaultSyncDataSource,
  columns,
  listener = defaultListener,
  initialPage = 1,
  pageSize = 15,
  hideOnSinglePage = true,
  emptyText = "No hay datos",
}) => {
  const { echo } = echoStore();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: initialPage,
      pageSize: pageSize,
      hideOnSinglePage: hideOnSinglePage,
    },
    sortOrder: undefined,
    sortField: undefined,
  });

  async function fetchInitialDataSource() {
    setLoading(true);
    try {
      const { newDataSource, newTableParams } =
        await syncDataSource(tableParams);
      setDataSource(newDataSource);
      setTableParams(newTableParams);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInitialDataSource();
    echo.private(channel).listen(event, async (data) => {
      try {
        console.log("Event received =>", data);
        setLoading(true);
        await listener(data); // callback so the user can execute some logic when the event is received.
        const { newDataSource, newTableParams } =
          await syncDataSource(tableParams); // Fetch the new dataSource according to the user's logic.
        setDataSource(newDataSource);
        setTableParams(newTableParams);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
    return () => {
      echo.leaveChannel(channel);
    };
  }, []);

  const handleTableChange = async (pagination, filters, sorter) => {
    const changeTableParams = {
      ...tableParams,
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    };
    setLoading(true);
    try {
      const { newDataSource, newTableParams } =
        await syncDataSource(changeTableParams);
      setDataSource(newDataSource);
      setTableParams(newTableParams);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table
      className={className}
      size={size}
      title={title}
      dataSource={dataSource}
      columns={columns}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      locale={{
        emptyText: <Empty description={emptyText}></Empty>,
      }}
    ></Table>
  );
};

export default TableWithSocket;
