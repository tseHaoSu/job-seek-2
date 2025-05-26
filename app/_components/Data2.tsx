"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { hiringData } from "@/app/constants/constants";

interface JobPosting {
  Category: string;
  "Job Postings": number;
  "Job Type": "Full Time" | "Part Time";
}

interface ChartDataItem {
  Category: string;
  "Full Time": number;
  "Part Time": number;
}

const fullTimeData = hiringData.slice(0, 10) as JobPosting[];
const partTimeData = hiringData[10] as JobPosting[];

const chartData = [...fullTimeData, ...partTimeData].reduce((acc, item) => {
  const existing = acc.find((x) => x.Category === item.Category);
  if (existing) {
    existing[item["Job Type"]] = item["Job Postings"];
  } else {
    acc.push({
      Category: item.Category,
      "Full Time": item["Job Type"] === "Full Time" ? item["Job Postings"] : 0,
      "Part Time": item["Job Type"] === "Part Time" ? item["Job Postings"] : 0,
    });
  }
  return acc;
}, [] as ChartDataItem[]);

const chartConfig = {
  "Full Time": {
    label: "Full Time",
    color: "hsl(var(--chart-1))",
  },
  "Part Time": {
    label: "Part Time",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Data2() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 leading-tight">
          The Digital Skills Gap  
        </h1>
        <p className="my-6 text-xl md:text-l text-red-900 leading-relaxed">
          In today’s world knowing how to use technology and tools isn’t
          something that’s an add on in your resume; It is an essential part of
          your portfolio. Whether you're searching for work, applying for a
          role, managing personal tasks, or trying to stay connected, digital
          tools like Word, Gmail, LinkedIn, Seek, or Excel is now a part of
          daily life. For Australians over 50, this can sometimes feel
          overwhelming. That’s exactly why our website exists: to help you learn
          what you need, when you need it quickly and easily.
        </p>
      </div>

      <Card className="w-full bg-white shadow-md border-none">
        <CardHeader>
          <CardTitle className="text-red-900">
            Job Postings by Category
          </CardTitle>
          <CardDescription className="text-red-900">
            Full Time vs Part Time Distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
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
                dataKey="Category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent className="border-none shadow-lg bg-white" />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="Full Time"
                fill={chartConfig["Full Time"].color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Part Time"
                fill={chartConfig["Part Time"].color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-red-900">
                Top Category: {chartData[0]?.Category}{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-red-900">
                Showing distribution of full-time and part-time positions across
                all categories
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
