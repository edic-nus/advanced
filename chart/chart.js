const PieCtx = document.getElementById("pie-chart");
const DoughnutCtx = document.getElementById("doughnut-chart");

const PieData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

new Chart(PieCtx, {
  type: "pie",
  data: PieData,
});

new Chart(DoughnutCtx, {
  type: "doughnut",
  data: PieData,
});

// ---------------------------
const BarCtx = document.getElementById("bar-chart");

const BarData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderWidth: 1,
    },
    {
      label: "My Second Dataset",
      data: [23, 40, 67, 20, 79, 30, 80],
      borderWidth: 1,
    },
  ],
};

new Chart(BarCtx, {
  type: "bar",
  data: BarData,
});

// --------------------------
const LineCtx = document.getElementById("line-chart");

const LineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      tension: 0.1,
    },
    {
      label: "My Second Dataset",
      data: [23, 40, 67, 20, 79, 30, 80],
      tension: 0.1,
    },
  ],
};

new Chart(LineCtx, {
  type: "line",
  data: LineData,
});

// --------------------------
const ScatterCtx = document.getElementById("scatter-chart");

const ScatterData = {
  datasets: [
    {
      label: "Scatter Dataset",
      data: [
        {
          x: 2,
          y: 4,
        },
        {
          x: 3,
          y: 2,
        },
        {
          x: 4,
          y: 5,
        },
        {
          x: 0.5,
          y: 5.5,
        },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

new Chart(ScatterCtx, {
  type: "scatter",
  data: ScatterData,
});
