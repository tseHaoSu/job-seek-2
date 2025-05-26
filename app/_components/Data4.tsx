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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { jobVacanciesData } from "@/app/constants/constants";

type StateKey = "New South Wales" | "Victoria" | "Queensland";

const chartConfig = {
  "New South Wales": {
    label: "New South Wales",
    color: "hsl(var(--chart-1))",
  },
  Victoria: {
    label: "Victoria",
    color: "hsl(var(--chart-2))",
  },
  Queensland: {
    label: "Queensland",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

// Get states from chartConfig to ensure we only use defined states
const states = Object.keys(chartConfig) as StateKey[];

interface YearData {
  year: string;
  count: number;
  [key: string]: string | number;
}

// Process data to get job vacancies by year and state
const processedData = jobVacanciesData.reduce((acc, item) => {
  const year = item.Quarter.split("-")[0];
  const state = item.State;
  const vacancies = item["Job Vacancies (000)"];

  // Only process states that are in our config
  if (!states.includes(state as StateKey)) return acc;

  const existingYear = acc.find((x) => x.year === year);
  if (existingYear) {
    existingYear[state] = ((existingYear[state] as number) || 0) + vacancies;
    existingYear.count = (existingYear.count || 0) + 1;
  } else {
    const newYear: YearData = {
      year,
      count: 1,
    };
    newYear[state] = vacancies;
    acc.push(newYear);
  }
  return acc;
}, [] as YearData[]);

// Calculate averages for each year and state, then sort
const chartData = processedData
  .map((item) => {
    const year = item.year;
    const count = item.count;
    const result: Record<string, number | string> = { year };

    states.forEach((state) => {
      result[state] = ((item[state] as number) || 0) / count;
    });

    return result;
  })
  .sort((a, b) => (a.year as string).localeCompare(b.year as string));

export function Data4() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 leading-tight">
          The Silver Advantage
        </h1>
        <p className="my-6 text-xl md:text-l text-red-900 leading-relaxed">
          Ignoring the steep dip and sharp incline during and post the COVID-19
          pandemic, it is clear that competition for jobs is increasing again,
          especially for people that are transitioning into new roles, or
          re-entering the job market. For Australians over 50 and fall into this
          category, knowing how to navigate platforms such as seek and linkedin
          along with knowing how to use tools such as word, excel, gmail etc, is
          extremely crucial.
        </p>
      </div>
      <Card className="w-full bg-white shadow-md border-none">
        <CardHeader>
          <CardTitle className="text-red-900">
            Job Vacancies Trends by State
          </CardTitle>
          <CardDescription className="text-red-900">
            Average quarterly job vacancies across major states
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
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
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
              <ChartLegend content={<ChartLegendContent />} />
              {states.map((state) => (
                <Area
                  key={state}
                  dataKey={state}
                  type="monotone"
                  fill={chartConfig[state].color}
                  fillOpacity={0.4}
                  stroke={chartConfig[state].color}
                  stackId="a"
                />
              ))}
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-red-900">
                Data from {chartData[0]?.year} to{" "}
                {chartData[chartData.length - 1]?.year}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-red-900">
                Showing average quarterly job vacancies in thousands by state
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
