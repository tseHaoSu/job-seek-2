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
    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 leading-tight">
          The Future of Work: Employment Trends in Australia
        </h1>
        <p className="my-6 text-xl md:text-l text-red-900 leading-relaxed">
          When we analyzed over 70 thousand job posting on seek.com.au, we found
          that Categories like Healthcare, Administration, Education, and
          hospitality dominate postings, for part time listings and IT, sales,
          logistics and services dominate for full time postings. These fields
          often attract mature aged workers due to experience, flexibility or
          re-careering needs. Yet many over 50s find these jobs confusing or
          intimidating due the need of digital skills for all these top lines of
          work. Yet many over 50s find Seek confusing or intimidating. Your
          quick tips simplify this experience, making job-seeking less
          frustrating and more effective.
        </p>
      </div>
      <Card className="w-full bg-white shadow-md border-none">
        <CardHeader>
          <CardTitle className="text-red-900">
            Employment Trends by Industry
          </CardTitle>
          <CardDescription className="text-red-900">
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
              <div className="flex items-center gap-2 leading-none text-red-900">
                Projected Growth: 2024-2034 <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-red-900">
                Showing employment trends across major industries
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
