import { useEffect, useState } from "react";
import { echoStore } from "../../../store/echo";
import StatisticsReport from "../StatisticsReport/StatisticsReport";
import { Spinner } from "../../atoms/Spinner/Spinner";
import IncidentsController from "../../../api/incidents";
import { institutionStore } from "../../../store/institution";
import { ENV } from "../../../utils/constants";

const StatisticsReportWithSocket = ({ channel, event }) => {
  const { incident } = institutionStore();
  const { echo } = echoStore();
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);

  async function syncIncidentStatistics() {
    setLoading(true);
    try {
      const response = await IncidentsController.getStatistics(
        ENV.INSTITUTION_ID,
        incident.risk_situation.id,
        incident.id,
      );
      setStatistics(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    echo.private(channel).listen(event, (data) => {
      syncIncidentStatistics();
    });
    syncIncidentStatistics();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <StatisticsReport
      className="statistics"
      statistics={[
        {
          type: "number",
          value: statistics?.total_reports,
          color: "#FF0000",
          label: "Total de informes",
          suffix: "informes",
        },
        {
          type: "number",
          value: statistics?.total_users,
          color: "#FF0000",
          label: "Total de usuarios",
          suffix: "usuarios",
        },
        {
          type: "progress",
          value: statistics?.total_safe,
          percent:
            statistics?.total_reports === 0
              ? 0
              : (statistics?.total_safe / statistics?.total_reports) * 100,
          color: "#00FF00",
          label: "Usuarios reportados a salvo",
          suffix: "usuarios",
        },
        {
          type: "progress",
          value: statistics?.total_at_risk,
          percent:
            statistics?.total_reports === 0
              ? 0
              : (statistics?.total_at_risk / statistics?.total_reports) * 100,
          color: "#FF0000",
          label: "Usuarios reportados en peligro",
          suffix: "usuarios",
        },
      ]}
    />
  );
};

export default StatisticsReportWithSocket;
