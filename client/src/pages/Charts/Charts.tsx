// @ts-expect-error: @canvasjs/react-charts doesn't have typescript definition for now
import CanvasJSReact from "@canvasjs/react-charts";

const Charts = () => {
  //const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "Trip Expenses",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: 20, label: "Airfare" },
          { y: 24, label: "Food & Drinks" },
          { y: 20, label: "Accomodation" },
          { y: 14, label: "Transportation" },
          { y: 12, label: "Activities" },
          { y: 10, label: "Misc" },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options = {options} 
			/>
    </div>
  );
};

export default Charts;
