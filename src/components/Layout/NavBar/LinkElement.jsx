import { NavLink } from "react-router-dom";
import colors from "../../../settings";
const LinkElement = ({ name, link, styled, onClick }) => {
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
    >
      <p
        className={`px-1 cursor-pointer font-bold text-tiny 2xl:text-smaller ${styled}`}
      >
        {name}
      </p>
    </NavLink>
  );
};

export default LinkElement;
