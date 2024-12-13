import { useEffect } from "react";
import "./BrigadierBase.css";
import { useNavigate } from "react-router-dom";

export const BrigadierBase = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/user");
  }, []);

  return <div className="menu-container">Nothing</div>;
};
