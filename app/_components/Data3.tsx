"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { employmentData } from "@/app/constants/constants";

interface EmploymentData {
  Industry: string;
  Year: string;
  "Employment ('000)": number;
}

const chartData = employmentData
  .reduce(
    (acc, item) => {
      const existing = acc.find((x) => x.Year === item.Year);
      if (existing) {
        existing[item.Industry] = item["Employment ('000)"];
      } else {
        acc.push({
          Year: item.Year,
          [item.Industry]: item["Employment ('000)"],
        });
      }
      return acc;
    },
    [] as Record<string, any>[]
  )
  .sort((a, b) => a.Year.localeCompare(b.Year));

const industries = Array.from(
  new Set(employmentData.map((item) => item.Industry))
);

const chartConfig = industries.reduce((acc, industry) => {
  acc[industry] = {
    label: industry,
    color: `hsl(var(--chart-${Object.keys(acc).length + 1}))`,
  };
  return acc;
}, {} as ChartConfig);

export function Data3() {
  return (
    <Card className="w-full bg-white shadow-md border-none">
      <CardHeader>
        <CardTitle>Employment Trends by Industry</CardTitle>
        <CardDescription>
          Projected employment growth from 2024 to 2034
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="border-none shadow-lg bg-white" />
              }
            />
            {industries.map((industry) => (
              <Area
                key={industry}
                dataKey={industry}
                type="monotone"
                fill={chartConfig[industry].color}
                fillOpacity={0.2}
                stroke={chartConfig[industry].color}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Projected Growth: 2024-2034 <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing employment trends across major industries
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
