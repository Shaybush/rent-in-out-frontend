import React from "react";
import RentCard from "../../../../../shared/components/rentCard";
import Users from "../../../../../assets/icons/users";
import Dashboard from "../../../../../assets/icons/dashboard";
import Categories from "../../../../../assets/icons/categories";
import { useNavigate } from "react-router-dom";

const CardView = ({
  count,
  content,
  icon,
  hexColor = "",
  link,
  styleClass,
}) => {
  const nav = useNavigate();
  return (
    <RentCard
      styleClass={`cursor-pointer ${styleClass}`}
      isColored={true}
      bottomColor={hexColor}
    >
      <div onClick={() => nav(link)} className="flex items-center">
        <div className="w-3/4">
          <h2 className="py-3 font-semibold">{count}</h2>
          <h2>{content}</h2>
        </div>
        <div className="w-1/4">
          {icon === "users" && (
            <Users width="64px" height="64px" color={hexColor} />
          )}
          {icon === "posts" && (
            <Dashboard width="64px" height="64px" color={hexColor} />
          )}
          {icon === "categories" && (
            <Categories width="64px" height="64px" color={hexColor} />
          )}
        </div>
      </div>
    </RentCard>
  );
};

export default CardView;
