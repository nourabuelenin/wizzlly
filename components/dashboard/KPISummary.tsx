import {
  BarChart2,
  ArrowUpCircle,
  ArrowDownCircle
} from "lucide-react";

export default function KPISummary() {
  const kpis = [
    {
      label: "Total Campaigns",
      value: "12",
      change: "+10%",
      isPositive: true,
      subtext: "from 8 (last month)",
    },
    {
      label: "Active Campaigns",
      value: "4",
      change: null,
      isPositive: true,
      subtext: "Currently running",
    },
    {
      label: "Total Posts",
      value: "86",
      change: "+12%",
      isPositive: true,
      subtext: "from 68 (last month)",
    },
    {
      label: "Total Reach",
      value: "1.28M",
      change: "+18%",
      isPositive: true,
      subtext: "from 1.1M (last month)",
    },
    {
      label: "Engagement",
      value: "4.9%",
      change: "-2%",
      isPositive: false,
      subtext: "from 6.9% (last month)",
    },
    {
      label: "CTR",
      value: "4.3%",
      change: "+2%",
      isPositive: true,
      subtext: "from 2.3% (last month)",
    },
    {
      label: "Conversions",
      value: "842",
      change: "+11%",
      isPositive: true,
      subtext: "from 642 (last month)",
    },
    {
      label: "ROAS",
      value: "3.4x",
      change: "+0.5%",
      isPositive: true,
      subtext: "from 2.8x (last month)",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
          <BarChart2 className="w-5 h-5 text-green-600 transform flex-shrink-0" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">KPI Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white border text-gray-900 border-gray-100 rounded-xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-start mb-2 min-h-[28px]">
              <p className="text-sm font-medium text-gray-700">{kpi.label}</p>
              {kpi.change && (
                <div
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    kpi.isPositive
                      ? "text-purple-700 bg-purple-50 border-purple-100"
                      : "text-red-700 bg-red-50 border-red-100"
                  }`}
                >
                  {kpi.isPositive ? (
                     <ArrowUpCircle className="w-3.5 h-3.5" />
                  ) : (
                     <ArrowDownCircle className="w-3.5 h-3.5" />
                  )}
                  {kpi.change}
                </div>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
            <p className="text-xs text-gray-400 font-medium">{kpi.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
