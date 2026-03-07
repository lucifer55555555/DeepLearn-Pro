
'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { format, subWeeks, startOfWeek, parseISO, isValid } from 'date-fns';
import { ChartConfig } from '@/components/ui/chart';

type CompletionLogs = {
  courses: string[];
  projects: string[];
};

type ActivityChartProps = {
  completionLogs: CompletionLogs;
};

// This function processes the raw date strings into weekly counts
const processActivityData = (logs: CompletionLogs, weeks: number) => {
  const weeklyActivity = new Array(weeks).fill(0).map((_, i) => {
    const weekStart = startOfWeek(subWeeks(new Date(), weeks - 1 - i));
    return {
      date: format(weekStart, 'MMM d'),
      completions: 0,
    };
  });

  const allCompletions = [...(logs.courses || []), ...(logs.projects || [])];

  allCompletions.forEach((dateString) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return; // Skip invalid date strings

      // Find the correct week bucket for the completion date
      for (let i = 0; i < weeks; i++) {
        const weekStart = startOfWeek(subWeeks(new Date(), weeks - 1 - i));
        const nextWeekStart = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        if (date >= weekStart && date < nextWeekStart) {
          if (weeklyActivity[i]) {
            weeklyActivity[i].completions += 1;
          }
          break;
        }
      }
    } catch (error) {
      console.warn(`Skipping invalid date format in logs: ${dateString}`);
    }
  });

  return weeklyActivity;
};

const chartConfig = {
  completions: {
    label: 'Completions',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ActivityChart({ completionLogs }: ActivityChartProps) {
  const chartData = useMemo(() => processActivityData(completionLogs, 12), [completionLogs]);
  const hasData = useMemo(() => chartData.some(d => d.completions > 0), [chartData]);
  
  if (!hasData) {
    return (
        <div className="text-center text-muted-foreground py-8">
            <p>No learning activity recorded in the last 12 weeks.</p>
            <p className='text-sm mt-2'>Complete a course or project to see your activity here!</p>
        </div>
    )
  }

  return (
    <div className="h-80 w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                />
                <Tooltip
                    cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                    content={<ChartTooltipContent
                        labelClassName='font-bold'
                        indicator='dot'
                    />}
                />
                <Bar dataKey="completions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
