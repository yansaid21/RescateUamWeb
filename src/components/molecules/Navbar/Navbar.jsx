import { BellOutlined, MenuOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { userStore } from "../../../store/user";
import useIncidentNotification from "../../../hooks/useIncidentNotification";

const Navbar = () => {
  const role = userStore((state) => state.role);
  const { incident } = useIncidentNotification();
  return (
    <div className="navbar">
      <div className="icons-container">
        <button className="icon-button">
          <Link to="/user">
            <div className="icon">
              <HomeOutlined />
            </div>
          </Link>
        </button>
        {role === 1 ? (
          <button className="icon-button">
            <Link to="/admin">
              <div className="icon">
                <BellOutlined />
              </div>
            </Link>
          </button>
        ) : role === 2 && incident ? (
          <button className="icon-button">
            <Link to="/brigadier">
              <div className="icon">
                <BellOutlined />
              </div>
            </Link>
          </button>
        ) : null}
        {role === 1 ? (
          <button className="icon-button">
            <Link to="/admin/menu">
              <div className="icon">
                <MenuOutlined />
              </div>
            </Link>
          </button>
        ) : null}
        <button className="icon-button">
          <Link to="/user/profile">
            <div className="icon">
              <FaUserCircle />
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
