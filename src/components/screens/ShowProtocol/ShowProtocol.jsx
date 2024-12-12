import { useParams } from "react-router-dom";
import ProtocolsController from "../../../api/protocols";
import { useEffect, useState } from "react";
import { Editor } from "../Editor/Editor";
import "./ShowProtocol.css";

export const ShowProtocol = () => {
  const { id_risk_situation, id_protocol } = useParams();
  const [protocol, setProtocol] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProtocol = async () => {
      try {
        const response = await ProtocolsController.getProtocol(
          id_risk_situation,
          id_protocol
        );
        setProtocol(response.data);
        console.log("Protocol: ", response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProtocol();
  }, [id_risk_situation, id_protocol]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="editor">
          <h1>{protocol.name}</h1>
          <Editor baseData={protocol.content} editable={false} />
        </div>
      )}
    </>
  );
};
