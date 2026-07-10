"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Slice = {
  name: string;
  value: number;
};

const colors = ["#2563eb", "#059669", "#d97706", "#7c3aed", "#dc2626"];

export function AssetMixChart({ data }: { data: Slice[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 6,
              border: "1px solid #d4d4d8",
              color: "#18181b",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
