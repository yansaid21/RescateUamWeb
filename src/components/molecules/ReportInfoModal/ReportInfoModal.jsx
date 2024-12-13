import { Modal, Tag, Input } from "antd";
const { TextArea } = Input;

export const stateColors = {
  safe: "green",
  at_risk: "red",
  outside: "gray",
};

export const resolutionColors = {
  safe: "green",
  at_risk: "red",
  dead: "black",
};

const ReportInfoModal = ({ report, open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onClose={onCancel}
      onOk={onCancel}
      title="Información del reporte"
      cancelButtonProps={{ style: { display: "none" } }}
      centered
      styles={{
        header: {
          textAlign: "center",
          fontSize: "2rem",
        },
        mask: {
          backdropFilter: "blur(10px)",
        },
        body: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem",
          gap: "1rem",
        },
        footer: {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      {report && (
        <>
          <p>
            <strong>Estado: </strong>
            <Tag color={stateColors[report.state]} key={report.state}>
              {report.state}
            </Tag>
          </p>
          <TextArea
            readOnly={true}
            value={report.description}
            autoSize={true}
          />
          <p>
            <strong>Resolución: </strong>
            <Tag
              color={
                report.resolution
                  ? resolutionColors[report.resolution]
                  : "default"
              }
              key={report.resolution}
            >
              {report.resolution ? report.resolution : "NO HAY"}
            </Tag>
          </p>
          {report.resolution && (
            <TextArea
              readOnly={true}
              value={report.resolutionDescription}
              autoSize={true}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default ReportInfoModal;
