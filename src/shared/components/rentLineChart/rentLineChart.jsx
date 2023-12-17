import { format, fromUnixTime } from "date-fns";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RentLineChart = ({
  config,
  width = "100%",
  height = "400px",
  backgroundColor = "transparent",
  strokeWidth = "2px",
  activeLegend = false,
  strokeDasharray = "3 3",
}) => {
  return (
    <div
      className="line-chart-wrapper"
      style={{ width: width, height: height, backgroundColor: backgroundColor }}
    >
      <ResponsiveContainer>
        <AreaChart
          width={width}
          height={height}
          data={config}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tickFormatter={(unix) => {
              const date = fromUnixTime(unix);
              if (date.getMonth() % 2 === 1) return format(date, "MMM, d");
              return "";
            }}
          />
          <YAxis />
          <CartesianGrid strokeDasharray={strokeDasharray} />
          <Tooltip
            labelFormatter={(unix) => {
              const date = fromUnixTime(unix);
              return format(date, "MMM, d");
            }}
          />
          {activeLegend && <Legend />}
          <Area
            strokeWidth={strokeWidth}
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentLineChart;
