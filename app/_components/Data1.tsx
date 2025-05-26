"use client";

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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { populationData } from "../constants/constants";

// Transform the data from separate arrays into an array of objects
const chartData = populationData.date.map((date, index) => ({
  date,
  over50: Math.round(populationData.percentage_50_plus[index]),
  under50: Math.round(populationData.percentage_under_50[index]),
}));

const chartConfig = {
  over50: {
    label: "Age 50+",
    color: "hsl(var(--chart-1))",
  },
  under50: {
    label: "Under 50",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Calculate the change in the last month
const lastMonthChange = parseFloat(
  (
    chartData[chartData.length - 1].over50 -
    chartData[chartData.length - 2].over50
  ).toFixed(2)
);

// Determine if the trend is up or down
const isTrendingDown = lastMonthChange < 0;

const Data1 = () => {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 leading-tight">
          The Great Digital Divide
        </h1>
        <p className="my-6 text-xl md:text-l text-red-900 leading-relaxed">
          Older Australians are quietly disappearing from the workforce — not
          because they lack ability, but because they're being left behind by
          digital change. Recent data shows a{" "}
          <span className="font-bold text-red-600">
            steady drop in workforce participation for Australians over 50
          </span>
          , while younger workers increasingly dominate. Between 2022 and 2025,
          the{" "}
          <span className="font-bold text-red-600">
            percentage of workers under 50 has consistently grown
          </span>{" "}
          — highlighting a widening skills gap. This isn't about retirement.
          It's about relevance. Without digital confidence, experienced workers
          lose opportunities, income, and sometimes even their sense of purpose.{" "}
          <span className="font-bold text-red-600">
            StillSkilled is here to change that
          </span>
          . We offer mature-age Australians a safe, simple space to explore
          digital tools and stay connected to modern work — confidently and on
          their own terms.
        </p>
      </div>
      <Card className="w-full bg-white shadow-md border-none">
        <CardHeader>
          <CardTitle className="text-red-900">Age Demographics Trend</CardTitle>
          <CardDescription className="text-red-900">
            Population percentage by age group (over/under 50)
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
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  // Format the date to show month and year more cleanly
                  const [year, month] = value.split("-");
                  return `${month}/${year.slice(2)}`;
                }}
                // Show fewer ticks for readability
                tick={{ fontSize: 12 }}
                interval={3}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    className="border-none shadow-lg bg-white"
                  />
                }
              />
              <Area
                name="Under 50"
                dataKey="under50"
                type="monotone"
                fill={chartConfig.under50.color}
                fillOpacity={0.4}
                stroke={chartConfig.under50.color}
                stackId="a"
              />
              <Area
                name="Age 50+"
                dataKey="over50"
                type="monotone"
                fill={chartConfig.over50.color}
                fillOpacity={0.4}
                stroke={chartConfig.over50.color}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-red-900">
                October 2022 - February 2025
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Data1;
