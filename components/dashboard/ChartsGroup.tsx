"use client";

import { Calendar, ChevronRight, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, ComposedChart 
} from 'recharts';

const ChartHeader = ({ title, date }: { title: string; date: string }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-md bg-purple-50 flex items-center justify-center">
        <PieChartIcon className="w-4 h-4 text-purple-600" />
      </div>
      <h3 className="font-bold text-gray-900">{title}</h3>
    </div>
    <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
      <span>{date}</span>
      <ChevronRight className="w-3 h-3 text-gray-500" />
    </div>
  </div>
);

// Performance Over Time Data
const performanceData = [
  { name: 'jan', reach: 660, conversions: 360, spend: 400 },
  { name: 'feb', reach: 800, conversions: 500, spend: 410 },
  { name: 'mar', reach: 950, conversions: 650, spend: 420 },
  { name: 'apr', reach: 980, conversions: 700, spend: 450 },
  { name: 'may', reach: 900, conversions: 520, spend: 800 },
  { name: 'jun', reach: 800, conversions: 460, spend: 1000 },
  { name: 'jul', reach: 500, conversions: 580, spend: 800 },
  { name: 'aug', reach: 330, conversions: 660, spend: 400 },
  { name: 'sep', reach: 450, conversions: 640, spend: 200 },
  { name: 'oct', reach: 700, conversions: 520, spend: 80 },
  { name: 'nov', reach: 740, conversions: 500, spend: 200 },
  { name: 'dec', reach: 740, conversions: 520, spend: 500 },
];

export function PerformanceOverTime() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Performance Over Time</h3>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
          <span>2025</span>
          <ChevronRight className="w-4 h-4 text-gray-500 ml-1" />
        </div>
      </div>
      
      <div className="h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Line type="monotone" dataKey="reach" stroke="#a855f7" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="Reach" />
            <Line type="monotone" dataKey="conversions" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Conversions" />
            <Line type="monotone" dataKey="spend" stroke="#d8b4fe" strokeWidth={2} dot={false} name="Spend" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <div className="flex gap-6 text-sm font-medium text-gray-600 mb-2 sm:mb-0">
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-[#a855f7]"></div> Reach</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-[#0ea5e9]"></div> Conversions</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-[#d8b4fe]"></div> Spend</div>
        </div>
        <div className="text-xs text-gray-500 font-medium text-center sm:text-right">
           Conversions increased 32% after creative refresh in May 2025.
        </div>
      </div>
    </div>
  );
}

const lifecycleData = [
  { name: 'Active', value: 4, color: '#a855f7', percentage: '33%' },
  { name: 'Scheduled', value: 3, color: '#d8b4fe', percentage: '25%' },
  { name: 'Completed', value: 3, color: '#0ea5e9', percentage: '25%' },
  { name: 'Draft', value: 2, color: '#eab308', percentage: '17%' },
];

export function LifecycleOverview() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Campaign Lifecycle Overview</h3>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
          <span>Mar 2025</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500 ml-1" />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between mt-auto mb-auto">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={lifecycleData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {lifecycleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 space-y-3 w-full sm:w-auto">
          {lifecycleData.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
               <span className="text-gray-600">{item.name}: {item.value}</span>
               <span className="font-bold" style={{color: item.color}}>{item.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const spendVsResultsData = [
  { name: '10', spring: 300, timeless: 280, conversions: 800 },
  { name: '30', spring: 530, timeless: 450, conversions: 1000 },
  { name: '45', spring: 400, timeless: 350, conversions: 850 },
  { name: '60', spring: 200, timeless: 380, conversions: 250 },
  { name: '80', spring: 320, timeless: 330, conversions: 650 },
  { name: '95', spring: 380, timeless: 330, conversions: 700 },
];

export function SpendVsResults() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Spent VS Results</h3>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
          <span>Mar 2025</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500 ml-1" />
        </div>
      </div>
      
      <div className="h-56 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={spendVsResultsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Bar dataKey="spring" stackId="a" fill="#c4b5fd" radius={[0, 0, 4, 4]} barSize={35} name="Spring Essentials Launch" />
            <Bar dataKey="timeless" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={35} name="Timeless Black Edit" />
            <Line type="monotone" dataKey="conversions" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Conversions" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-6 text-xs font-medium text-gray-600 justify-center">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#c4b5fd]"></div> Spring Essentials Launch</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#8b5cf6]"></div> Timeless Black Edit</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#0ea5e9]"></div> Conversions</div>
      </div>
    </div>
  );
}

const platformData = [
  { name: 'Instagram', engagement: 82 },
  { name: 'Facebook', engagement: 68 },
  { name: 'Tiktok', engagement: 78 },
];

export function EngagementByPlatform() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Engagement by Platform</h3>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
          <span>Mar 2025</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500 ml-1" />
        </div>
      </div>
      
      <div className="h-44 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={platformData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 12, fontWeight: 500}} width={70} />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Bar dataKey="engagement" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} name="Engagement %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex gap-2 text-xs text-gray-600 font-medium items-center mt-4 justify-start">
        <div className="w-2.5 h-2.5 rounded-sm bg-[#0ea5e9]"></div> Engagement
      </div>
    </div>
  );
}

const contentTypeData = [
  { name: 'Carousel', engagement: 85 },
  { name: 'Reels', engagement: 75 },
  { name: 'Images', engagement: 60 },
  { name: 'Video Ads', engagement: 80 },
];

export function EngagementByContentType() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Engagement by Content Type</h3>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
          <span>Mar 2025</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500 ml-1" />
        </div>
      </div>
      
      <div className="h-44 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={contentTypeData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 12, fontWeight: 500}} width={70} />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Bar dataKey="engagement" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} name="Engagement %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex gap-2 text-xs text-gray-600 font-medium items-center mt-4 justify-start">
        <div className="w-2.5 h-2.5 rounded-sm bg-[#0ea5e9]"></div> Engagement
      </div>
    </div>
  );
}
