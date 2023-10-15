import { NavLink } from "react-router-dom";
const LinkElement = ({ name, link, styled, onClick }) => {
  return (
    <NavLink
      onClick={onClick}
      style={({ isActive }) => {
        return {
          color: isActive ? "#B28A5D" : "white",
          borderRadius: 0,
          borderBottomColor: isActive ? "#B28A5D" : "transparent",
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
