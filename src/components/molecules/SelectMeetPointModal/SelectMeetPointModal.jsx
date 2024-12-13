import { Button, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { ENV } from "../../../utils/constants";
import MeetPointsController from "../../../api/meet_points";
import { useFormik } from "formik";
import { userStore } from "../../../store/user";

const SelectMeetPointModal = ({ open, onCancel, onLoading }) => {
  const { syncUser } = userStore();
  const [meetpoints, setMeetpoints] = useState([]);
  const [loadingMeetpoints, setLoadingMeetpoints] = useState(false);
  const formik = useFormik({
    initialValues: {
      selectedMeetpoint: null,
    },
    validate: (values) => {
      console.log(values);
      const errors = {};
      if (!values.selectedMeetpoint) {
        errors.selectedMeetpoint = "El punto de encuentro es requerido";
      }
      return errors;
    },
    onSubmit: (values) => {
      onLoading();
      handleAssignMeetPoint(values.selectedMeetpoint);
    },
  });

  const handleAssignMeetPoint = async (meetpointId) => {
    try {
      await MeetPointsController.assignMeetPoint(
        ENV.INSTITUTION_ID,
        meetpointId,
      );
      await syncUser();
    } catch (error) {
      console.log(error);
    } finally {
      onCancel();
    }
  };

  const syncMeetpoints = async () => {
    try {
      setLoadingMeetpoints(true);
      const meetpoints = await MeetPointsController.getMeetPoints(
        ENV.INSTITUTION_ID,
      );
      const newMeetPoints = meetpoints.data.map((meetpoint) => {
        return { value: meetpoint.id, label: meetpoint.name };
      });
      setMeetpoints(newMeetPoints);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMeetpoints(false);
    }
  };

  useEffect(() => {
    syncMeetpoints();
  }, []);

  return (
    <form style={{ display: "none" }}>
      <Modal
        open={open}
        onCancel={onCancel}
        title="Asignarse a un punto de encuentro"
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
            padding: "1rem",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          },
          footer: {
            display: "flex",
            justifyContent: "center",
          },
        }}
        footer={[
          <Button key="submit" type="primary" onClick={formik.handleSubmit}>
            Asignarse
          </Button>,
        ]}
      >
        <Select
          style={{ width: "300px" }}
          size="large"
          id="selectedMeetpoint"
          name="selectedMeetpoint"
          onChange={(value) => formik.setFieldValue("selectedMeetpoint", value)}
          options={meetpoints}
          loading={loadingMeetpoints}
          status={
            formik.touched.selectedMeetpoint && formik.errors.selectedMeetpoint
              ? "error"
              : ""
          }
        />
        {formik.touched.selectedMeetpoint &&
          formik.errors.selectedMeetpoint && (
            <span style={{ color: "red" }}>
              {formik.errors.selectedMeetpoint}
            </span>
          )}
      </Modal>
    </form>
  );
};

export default SelectMeetPointModal;
