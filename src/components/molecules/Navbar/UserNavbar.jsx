import { BarChartOutlined, BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { userStore } from "../../../store/user";

const UserNavbar = () => {
  const { user } = userStore();
  const role_user = user.role.id;
  console.log('role_user ', role_user);
  
  return (
    <div className="navbar">
      <div className="icons-container">
        <button className="icon-button">
          <Link to="/user">
            <div className="icon">
              <BellOutlined />
            </div>
          </Link>
        </button>
        {/* {role_user === 2 ? 
          <button className="icon-button">
          <Link to="/admin/usersStadistics">
            <div className="icon" >
            <BarChartOutlined />
            </div>
          </Link>
        </button> : null} */}
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
export default UserNavbar;
