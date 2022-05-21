import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineGraph = (props) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthlyExpenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const expense of props.expenses) {
    monthlyExpenses[expense.date.getMonth()] += expense.amount;
  }

  const data = {
    labels: months,
    datasets: [
      {
        label: "Line graph",
        data: monthlyExpenses,
        backgroundColor: "#E84855",
        borderColor: "#E84855",
        fill: false,
        stepped: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineGraph;

// const config = {
//   type: "line",
//   data: data,
//   options: {
//     responsive: true,
//     interaction: {
//       intersect: false,
//       axis: "x",
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: (ctx) =>
//           "Step " + ctx.chart.data.datasets[0].stepped + " Interpolation",
//       },
//     },
//   },
// };

// const actions = [
//   {
//     name: "Step: false (default)",
//     handler: (chart) => {
//       chart.data.datasets.forEach((dataset) => {
//         dataset.stepped = false;
//       });
//       chart.update();
//     },
//   },
//   {
//     name: "Step: true",
//     handler: (chart) => {
//       chart.data.datasets.forEach((dataset) => {
//         dataset.stepped = true;
//       });
//       chart.update();
//     },
//   },
//   {
//     name: "Step: before",
//     handler: (chart) => {
//       chart.data.datasets.forEach((dataset) => {
//         dataset.stepped = "before";
//       });
//       chart.update();
//     },
//   },
//   {
//     name: "Step: after",
//     handler: (chart) => {
//       chart.data.datasets.forEach((dataset) => {
//         dataset.stepped = "after";
//       });
//       chart.update();
//     },
//   },
//   {
//     name: "Step: middle",
//     handler: (chart) => {
//       chart.data.datasets.forEach((dataset) => {
//         dataset.stepped = "middle";
//       });
//       chart.update();
//     },
//   },
// ];
