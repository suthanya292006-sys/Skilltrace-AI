import { Box, Typography } from '@mui/material';
import { Radar, Bar, Doughnut, Line } from 'react-chartjs-2';
import '../charts/chartSetup';
import { tokens } from '../../styles/theme';

export default function ReportCharts({ chartData, title, type = 'bar', height = 280, accentColor = tokens.teal }) {
  if (!chartData || !chartData.labels) {
    return null;
  }

  // 1. Radar Chart
  if (type === 'radar' || chartData.type === 'radar') {
    const data = {
      labels: chartData.labels,
      datasets: [
        {
          label: title || 'Assessment Profile',
          data: chartData.values,
          backgroundColor: `${accentColor}25`,
          borderColor: accentColor,
          borderWidth: 2.5,
          pointBackgroundColor: accentColor,
          pointBorderColor: '#fff',
          pointRadius: 4.5,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { display: true, stepSize: 20, backdropColor: 'transparent', font: { size: 10 } },
          grid: { color: 'rgba(102,112,133,0.18)' },
          angleLines: { color: 'rgba(102,112,133,0.18)' },
          pointLabels: { font: { size: 11.5, weight: '600' }, color: tokens.ink },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tokens.ink,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 12 },
          padding: 10,
          cornerRadius: 8,
        },
      },
    };

    return (
      <Box>
        {title && (
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: tokens.ink }}>
            {title}
          </Typography>
        )}
        <Box sx={{ height }}>
          <Radar data={data} options={options} />
        </Box>
      </Box>
    );
  }

  // 2. Horizontal / Vertical Bar Chart
  if (type === 'bar' || type === 'horizontalBar' || chartData.type === 'bar' || chartData.type === 'horizontalBar') {
    const isHorizontal = type === 'horizontalBar' || chartData.type === 'horizontalBar';

    const data = {
      labels: chartData.labels,
      datasets: [
        {
          label: title || 'Score Rating',
          data: chartData.values,
          backgroundColor: chartData.values.map((v) =>
            v >= 90 ? accentColor : v >= 80 ? '#3B82F6' : v >= 70 ? '#8B5CF6' : tokens.amber
          ),
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };

    const options = {
      indexAxis: isHorizontal ? 'y' : 'x',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 0,
          max: 100,
          grid: { display: !isHorizontal, color: 'rgba(102,112,133,0.1)' },
          ticks: { font: { size: 11 }, color: tokens.slate },
        },
        y: {
          min: 0,
          max: 100,
          grid: { display: isHorizontal, color: 'rgba(102,112,133,0.1)' },
          ticks: { font: { size: 11, weight: '600' }, color: tokens.ink },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tokens.ink,
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => ` Score: ${ctx.parsed[isHorizontal ? 'x' : 'y']}%`,
          },
        },
      },
    };

    return (
      <Box>
        {title && (
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: tokens.ink }}>
            {title}
          </Typography>
        )}
        <Box sx={{ height }}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    );
  }

  // 3. Doughnut Chart
  if (type === 'doughnut' || chartData.type === 'doughnut') {
    const data = {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.values,
          backgroundColor: ['#0F9D8C', '#3B82F6', '#8B5CF6', '#F5A623'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { font: { size: 11, weight: '500' }, color: tokens.ink, usePointStyle: true, boxWidth: 8 },
        },
        tooltip: {
          backgroundColor: tokens.ink,
          padding: 10,
          cornerRadius: 8,
        },
      },
      cutout: '65%',
    };

    return (
      <Box>
        {title && (
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: tokens.ink }}>
            {title}
          </Typography>
        )}
        <Box sx={{ height }}>
          <Doughnut data={data} options={options} />
        </Box>
      </Box>
    );
  }

  // 4. Line Chart (Trend)
  const lineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: title || 'Placement Readiness Trend',
        data: chartData.values,
        borderColor: accentColor,
        backgroundColor: `${accentColor}18`,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: accentColor,
        pointBorderColor: '#ffffff',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 50,
        max: 100,
        grid: { color: 'rgba(102,112,133,0.12)' },
        ticks: { font: { size: 11 }, color: tokens.slate },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, weight: '600' }, color: tokens.ink },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tokens.ink,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ` Score: ${ctx.parsed.y}%`,
        },
      },
    },
  };

  return (
    <Box>
      {title && (
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: tokens.ink }}>
          {title}
        </Typography>
      )}
      <Box sx={{ height }}>
        <Line data={lineData} options={lineOptions} />
      </Box>
    </Box>
  );
}
