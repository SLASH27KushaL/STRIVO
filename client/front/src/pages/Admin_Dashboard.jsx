import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Admin_Layout from '../components/layout/Admin_Layout'; // Make sure this path is correct

// Register ChartJS components
ChartJS.register(...registerables);

const Admin_Dashboard = () => {
  // Chart data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chatActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Messages Sent',
        data: [120, 190, 300, 250, 200, 150, 100],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  const userDistributionData = {
    labels: ['Active', 'Inactive', 'Banned'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          '#4caf50', // success
          '#ff9800', // warning
          '#f44336', // error
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Admin_Layout title="Dashboard">
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Welcome back, Admin
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's what's happening with your platform today
        </Typography>
      </Box>

      {/* Analytics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Users', value: '1,254', change: '+12%', changeColor: 'success.main' },
          { title: 'Active Chats', value: '86', change: '+5%', changeColor: 'success.main' },
          { title: 'Messages Today', value: '1,429', change: '-3%', changeColor: 'error.main' },
          { title: 'Avg. Session', value: '4.2m', change: '+0.5m', changeColor: 'success.main' },
        ].map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {metric.value}
                </Typography>
                <Typography variant="caption" color={metric.changeColor}>
                  {metric.change} from last period
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Growth
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Line 
                  data={userGrowthData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Pie
                  data={userDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '12px', boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Chat Activity
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Bar
                  data={chatActivityData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Admin_Layout>
  );
};

export default Admin_Dashboard;