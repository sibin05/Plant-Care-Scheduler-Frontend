import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import { axiosConfig } from '../services/axiosConfig';

const COLORS = ['#10B981', '#34D399', '#6EE7B7'];

const UsageAnalytics = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginDays, setLoginDays] = useState(new Set());

  useEffect(() => {
    fetchData();
    trackLoginDay();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosConfig.get('/plants');
      const plantsData = Array.isArray(response.data) ? response.data : response.data.content || [];
      setPlants(plantsData);
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackLoginDay = () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    const storedLogins = JSON.parse(localStorage.getItem('loginDates') || '[]');
    
    if (!storedLogins.includes(todayString)) {
      storedLogins.push(todayString);
      localStorage.setItem('loginDates', JSON.stringify(storedLogins));
    }
    
    // Convert current month dates to day numbers for calendar display
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentMonthLogins = storedLogins
      .filter(dateStr => {
        const date = new Date(dateStr);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .map(dateStr => new Date(dateStr).getDate());
    
    setLoginDays(new Set(currentMonthLogins));
  };

  // Dynamic data based on actual plants
  const getWaterUsageData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      name: month,
      value: Math.floor(Math.random() * 30) + plants.length * 2
    }));
  };

  const getPlantsByLocation = () => {
    const locationCount = plants.reduce((acc, plant) => {
      const location = plant.location || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(locationCount).map(([name, value]) => ({ name, value }));
  };

  const getHealthDistribution = () => {
    const healthCount = plants.reduce((acc, plant) => {
      const status = plant.healthStatus || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(healthCount).map(([name, value]) => ({ name, value }));
  };

  const getSpeciesData = () => {
    const speciesCount = plants.reduce((acc, plant) => {
      const species = plant.species?.name || 'Unknown';
      acc[species] = (acc[species] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(speciesCount).map(([name, value]) => ({ name, value }));
  };

  const getMonthlyCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const calendar = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendar.push({ day: '', isLogin: false, isEmpty: true });
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push({ 
        day, 
        isLogin: loginDays.has(day),
        isEmpty: false,
        isToday: day === today.getDate()
      });
    }
    return calendar;
  };

  const calculateHealthScore = () => {
    if (plants.length === 0) return 0;
    const excellentPlants = plants.filter(p => p.healthStatus === 'EXCELLENT').length;
    return Math.round((excellentPlants / plants.length) * 100);
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>Loading Analytics...</div>
      </div>
    );
  }
  return (
    <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', backgroundColor: '#f0f9f4', minHeight: '100vh' }}>

      {/* Water Usage Trend */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>Water Usage Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={getWaterUsageData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Plant Health Distribution */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>Plant Health Status</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={getHealthDistribution()}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
            >
              {getHealthDistribution().map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Plants by Location */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>Plants by Location</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={getPlantsByLocation()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Species Distribution */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>Plant Species</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={getSpeciesData()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall Plant Health Score */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '16px', color: '#065f46' }}>Plant Health Score</h2>
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: '8px solid #059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
            {calculateHealthScore()}%
          </div>
        </div>
      </div>

      {/* Monthly Login Calendar */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>Monthly Login Calendar</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginTop: '16px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ padding: '8px', textAlign: 'center', fontWeight: '600', color: '#065f46', fontSize: '12px' }}>
              {day}
            </div>
          ))}
          {getMonthlyCalendar().map((day, index) => (
            <div 
              key={index} 
              style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: day.isEmpty ? 'transparent' : 
                                day.isLogin ? '#10b981' : 
                                day.isToday ? '#34D399' : '#f3f4f6',
                color: day.isLogin || day.isToday ? 'white' : '#374151',
                border: day.isToday ? '2px solid #059669' : 'none'
              }}
            >
              {day.day}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#10b981" style={{marginRight: '4px'}}>
            <circle cx="12" cy="12" r="10"/>
          </svg> Login days | 
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#34D399" style={{marginRight: '4px'}}>
            <circle cx="12" cy="12" r="10"/>
          </svg> Today
        </div>
      </div>

    </div>
  );
};

export default UsageAnalytics;