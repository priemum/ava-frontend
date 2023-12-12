import { NavLink } from "react-router-dom";
import colors from "../../../settings";
const LinkElement = ({ name, link, styled, onClick, drop }) => {
  return (
    <NavLink
      onClick={onClick}
      style={({ isActive }) => {
        return {
          color: isActive ? colors.secondary : "white",
          borderRadius: 0,
          borderBottomColor: isActive ? colors.secondary : "transparent",
          borderBottomWidth: 2,
          paddingBottom: 4,
        };
      }}
      to={link}
      className="hover:!text-secondary transition-all duration-200"
    >
      <p
        className={`px-1 cursor-pointer font-bold ${
          drop ? "text-small 2xl:text-med" : "text-med 2xl:text-big "
        } ${styled}`}
      >
        {name}
      </p>
    </NavLink>
  );
};

export default LinkElement;
