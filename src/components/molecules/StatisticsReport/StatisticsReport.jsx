import "./StatisticsReport.css";
import PropTypes from "prop-types";
import { Progress } from "antd";
import { Card, Col, Row, Statistic, Tooltip } from "antd";

// Statics es un array de objetos con dos propiedades: type: number/progress, value: number, color: string, label: string
// Se espera que el array de objetos sea de la forma [{type: "number", value: 10, color: "#FF0000", label: "Total de incidentes"}, {type: "progress", value: 50, color: "#00FF00", label: "Incidentes resueltos"}]

StatisticsReport.propTypes = {
  statistics: PropTypes.array.isRequired,
};

export default function StatisticsReport({ className, statistics }) {
  const statisticsNumber = statistics.filter(
    (statistic) => statistic.type === "number",
  );
  const statisticsProgress = statistics.filter(
    (statistic) => statistic.type === "progress",
  );

  return (
    <section className={`statistics-report ${className}`}>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {statisticsNumber.map((statistic, index) => {
          return (
            <Col key={index} className="gutter-row" span={12}>
              <Card bordered={false}>
                <Statistic
                  title={statistic.label}
                  value={statistic.value}
                  valueStyle={{ color: statistic.color ?? "#3f8600" }}
                  suffix={statistic.suffix ?? ""}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      {statisticsProgress.map((statistic, index) => {
        return (
          <Row
            key={index}
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={24}>
              <h3 className="statistics-report-title">{statistic.label}</h3>
              <Tooltip
                placement="top"
                title={`${statistic.value} ${statistic.suffix ?? ""}`}
              >
                <Progress
                  percent={statistic.percent}
                  percentPosition={{ align: "center", type: "inner" }}
                  strokeColor={statistic.color}
                  strokeWidth={20}
                />
              </Tooltip>
            </Col>
          </Row>
        );
      })}
    </section>
  );
}
