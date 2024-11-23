import RoundedButton from "../../../atoms/RoundedButton/RoundedButton";
import "./AdminIncident.css";
import logo1 from "../../../../assets/UAM/Logos_UAM-06.png"; // Ajusta la ruta según tu estructura
import logo2 from "../../../../assets/UAM/Logos_UAM-10.png";
import StatisticsReport from "../../../molecules/StatisticsReport/StatisticsReport";

export const AdminIncident = () => {
  const incidentTypeId = 1;

  return (
    <section className="admin-incident">
      <RoundedButton
        onClick={() => console.log("Botón presionado")}
        disabled={incidentTypeId === null ? true : false}
        buttonClass={{
          width: "300px",
          height: "300px",
          backgroundColor: "#F4D73B",
        }}
        disabledClass={{ backgroundColor: "#0090D0" }}
        imageSrc={logo1}
        disabledImageSrc={logo2}
      />
      <StatisticsReport
        statistics={[
          {
            type: "number",
            value: 125,
            color: "#FF0000",
            label: "Total de informes",
            suffix: "informes",
          },
          {
            type: "number",
            value: 247,
            color: "#FF0000",
            label: "Total de usuarios",
            suffix: "usuarios",
          },
          {
            type: "progress",
            value: 100,
            percent: 20,
            color: "#00FF00",
            label: "Usuarios a salvo",
            suffix: "usuarios",
          },
          {
            type: "progress",
            value: 287,
            percent: 55,
            color: "#FF0000",
            label: "Usuarios en peligro",
            suffix: "usuarios",
          },
        ]}
      />
    </section>
  );
};
