"use client";
import { useInteractions } from "@/context/InteractionContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsPage() {
  const { interactions } = useInteractions();


  const counts = {
    Call: interactions.filter((i) => i.type === "Call").length,
    Text: interactions.filter((i) => i.type === "Text").length,
    Video: interactions.filter((i) => i.type === "Video").length,
  };

  const chartData = {
    labels: ["Text", "Call", "Video"],
    datasets: [
      {
        data: [counts.Text, counts.Call, counts.Video],
     
        backgroundColor: ["#8b5cf6", "#1e3a3a", "#10b981"], 
        hoverOffset: 15,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 30,
          font: {
            size: 12,
            family: "sans-serif",
          },
        
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, i) => ({
              text: label,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: datasets[0].backgroundColor[i],
              lineWidth: 0,
              hidden: false,
              index: i,
            }));
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(30, 58, 58, 0.9)",
        padding: 12,
        cornerRadius: 8,
      }
    },
    cutout: "70%", 
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <h1 className="text-[42px] font-bold text-[#1e293b] mb-12">
          Friendship Analytics
        </h1>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12">
          <h2 className="text-lg font-bold text-[#1e3a3a] mb-10">
            By Interaction Type
          </h2>

          <div className="relative h-112 w-full flex flex-col items-center justify-center">
            {interactions.length > 0 ? (
              <Doughnut data={chartData} options={options} />
            ) : (
              <div className="text-center text-slate-400 italic">
                No interaction data logged yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}