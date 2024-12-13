import { Button, Modal, Select, Input } from "antd";
import UserReportsController from "../../../api/userReports";
import { institutionStore } from "../../../store/institution";
import { useFormik } from "formik";
const { TextArea } = Input;

const resolutionStates = [
  {
    value: "safe",
    label: "Safe",
  },
  {
    value: "at_risk",
    label: "At risk",
  },
  {
    value: "dead",
    label: "Dead",
  },
];

const CloseReportModal = ({ report, open, onCancel }) => {
  const { institution, incident } = institutionStore();

  const validate = (values) => {
    const errors = {};
    if (values.resolutionState === null) {
      errors.resolutionState = "El estado de la resolución es requerido";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      resolutionState: null,
      resolutionDescription: null,
    },
    validate,
    onSubmit: (values) => {
      handleUserReportResolution(values);
    },
  });

  const handleUserReportResolution = async (values) => {
    try {
      const response = await UserReportsController.userReportResolution(
        institution.id,
        incident.risk_situation_id,
        incident.id,
        report.key,
        {
          state: values.resolutionState,
          description: values.resolutionDescription,
        },
      );
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form style={{ display: "none" }}>
      <Modal
        open={open}
        onCancel={onCancel}
        title="Cerrar reporte de usuario"
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
            gap: "2rem",
          },
          footer: {
            display: "flex",
            justifyContent: "center",
          },
        }}
        footer={[
          <Button key="submit" type="primary" onClick={formik.handleSubmit}>
            Cerrar reporte
          </Button>,
        ]}
      >
        <Select
          id="resolutionState"
          name="resolutionState"
          style={{ width: "300px" }}
          size="large"
          onChange={(value) => formik.setFieldValue("resolutionState", value)}
          options={resolutionStates}
          status={
            formik.touched.resolutionState && formik.errors.resolutionState
              ? "error"
              : ""
          }
        />
        {formik.touched.resolutionState && formik.errors.resolutionState && (
          <span style={{ color: "red" }}>{formik.errors.resolutionState}</span>
        )}
        <TextArea
          id="resolutionDescription"
          name="resolutionDescription"
          placeholder="Describe la resolución del reporte"
          onChange={(e) =>
            formik.setFieldValue("resolutionDescription", e.target.value)
          }
          style={{ height: 120 }}
        />
      </Modal>
    </form>
  );
};

export default CloseReportModal;
