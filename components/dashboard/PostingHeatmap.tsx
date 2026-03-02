import { Calendar, ChevronRight, Activity } from "lucide-react";

export default function PostingHeatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = ["6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"];

  // Mocking heatmap intensity (0-4) where 0 is transparent, 4 is dark purple
  const heatmapData = [
    [1, 2, 0, 2, 0, 1, 0], // 6 AM
    [0, 2, 3, 0, 1, 3, 0], // 8 AM
    [1, 0, 2, 1, 0, 2, 0], // 10 AM
    [2, 0, 3, 0, 0, 0, 2], // 12 PM
    [0, 0, 2, 0, 2, 3, 0], // 2 PM
    [1, 2, 1, 0, 0, 1, 1], // 4 PM
    [0, 0, 1, 0, 3, 0, 1], // 6 PM
    [1, 2, 4, 0, 0, 2, 0], // 8 PM
    [0, 2, 1, 2, 0, 1, 1], // 10 PM
  ];

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 1:
        return "bg-purple-100";
      case 2:
        return "bg-purple-300";
      case 3:
        return "bg-purple-500";
      case 4:
        return "bg-purple-700";
      default:
        return "bg-gray-50"; // lowest
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm w-full font-sans">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-50 flex items-center justify-center">
            <Activity className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900">Posting Heatmap</h3>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
          <Calendar className="w-3 h-3 text-gray-500" />
          <span>Mar 2024</span>
          <ChevronRight className="w-3 h-3 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Grid Area */}
        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[400px]">
            {/* Header row (Days) */}
            <div className="flex mb-2">
              <div className="w-12 shrink-0"></div>
              {days.map((day) => (
                <div key={day} className="flex-1 text-center text-xs text-gray-500 font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid rows */}
            <div className="space-y-1">
              {hours.map((hour, rowIndex) => (
                <div key={hour} className="flex items-center">
                  <div className="w-12 shrink-0 text-left text-[10px] sm:text-xs text-gray-400 font-medium pr-2">
                    {hour}
                  </div>
                  {heatmapData[rowIndex].map((intensity, colIndex) => (
                    <div
                      key={colIndex}
                      className={`flex-1 h-8 rounded-sm mx-0.5 border border-white transition-colors hover:brightness-95 cursor-pointer ${getColor(
                        intensity
                      )}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend / Insights Area */}
        <div className="w-full lg:w-48 shrink-0 flex flex-col justify-center space-y-6">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Best posting window</p>
            <p className="font-bold text-gray-900 text-lg">Tue 6-9 PM</p>
          </div>
          
          <div>
            <p className="font-bold text-gray-900 mb-1">Tue & Thu</p>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-700">
               Highest engagement ↗
            </div>
          </div>

          <div>
             <p className="font-bold text-gray-900 mb-1">Sundays</p>
             <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-600">
               Lowest conversions ↘
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
