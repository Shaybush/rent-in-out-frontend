import React from "react";
import { useSelector } from "react-redux";
import RentBarChart from "../../../shared/components/rentBarChart";
import RentCard from "../../../shared/components/rentCard";
import RentLineChart from "../../../shared/components/rentLineChart";
import CardView from "./components/cardView";
import { cardViewConfig } from "./config/cardView.config";

const HomeAdmin = () => {
  const user = useSelector((state) => state.userSlice.user);
  // config
  const data = [
    {
      name: 1687368739,
      users: 30,
    },
    {
      name: 1689960739,
      users: 40,
    },
    {
      name: 1692639139,
      users: 200,
    },
    {
      name: 1695317539,
      users: 180,
    },
    {
      name: 1697909539,
      users: 300,
    },
  ];

  const data04 = [
    { name: "Sport", Category: 4000 },
    { name: "Electric", Category: 3000 },
    { name: "surf", Category: 2000 },
    { name: "car", Category: 2780 },
    { name: "furniture", Category: 1890 },
    { name: "garden", Category: 2390 },
    { name: "household", Category: 3490 },
  ];

  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        {cardViewConfig.map((cardView) => {
          return (
            <CardView
              content={cardView.content}
              count={cardView.count}
              icon={cardView.icon}
              hexColor={cardView.cardColor}
              key={cardView.key}
              link={cardView.link}
              styleClass={"w-1/3 mb-3"}
            />
          );
        })}
      </div>

      {/* posts by category */}
      <RentCard styleClass={"mb-4 shadow-lg"}>
        <h4 className="ps-3 mb-4 font-semibold text-center">Category:</h4>
        <RentBarChart config={data04} activeLegend={false} />
      </RentCard>

      {/* users by date */}
      <RentCard styleClass={"shadow-lg"}>
        <h4 className="ps-3 mb-4 font-semibold text-center">Users:</h4>
        <RentLineChart config={data} />
      </RentCard>
    </React.Fragment>
  );
};
export default HomeAdmin;
