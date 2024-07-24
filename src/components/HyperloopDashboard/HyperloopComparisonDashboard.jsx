import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Table, Button } from 'react-bootstrap';
import './HyperloopDashboard.css';

const transportData = [
  { mode: 'Hyperloop', speed: 1000, comfort: 10, eco: 9, cost: 7, innovation: 10, safety: 9, capacity: 100, maintenanceCost: 5 },
  { mode: 'HSR', speed: 300, comfort: 8, eco: 7, cost: 6, innovation: 6, safety: 8, capacity: 80, maintenanceCost: 7 },
  { mode: 'Aereo', speed: 900, comfort: 6, eco: 3, cost: 5, innovation: 7, safety: 7, capacity: 150, maintenanceCost: 8 },
  { mode: 'Auto', speed: 120, comfort: 7, eco: 2, cost: 4, innovation: 5, safety: 5, capacity: 5, maintenanceCost: 9 },
  { mode: 'Bus', speed: 100, comfort: 5, eco: 6, cost: 8, innovation: 3, safety: 6, capacity: 50, maintenanceCost: 6 },
];

const colors = {
  Hyperloop: '#8884d8',
  HSR: '#82ca9d',
  Aereo: '#ffc658',
  Auto: '#d84d4d',
  Bus: '#a4d8e8'
};

const HyperloopDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chartType, setChartType] = useState('bar');
  const [sortedData, setSortedData] = useState([...transportData]);
  const [sortOrder, setSortOrder] = useState('asc');
  const { t } = useTranslation();

  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    if (chartContainerRef.current) {
      const containerWidth = chartContainerRef.current.offsetWidth;
      setChartWidth(activeTab === 'overview' ? Math.max(containerWidth * 1.3, containerWidth + 300) : containerWidth);
    }
  }, [activeTab, chartContainerRef]);

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sorted = [...sortedData].sort((a, b) => {
      if (activeTab === 'overview') return 0;
      if (newSortOrder === 'asc') {
        return a[activeTab] - b[activeTab];
      } else {
        return b[activeTab] - a[activeTab];
      }
    });
    setSortedData(sorted);
  };

  const renderTable = () => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{t('Mode')}</th>
          {activeTab === 'overview' ? (
            <>
              <th>{t('Speed')}</th>
              <th>{t('Comfort')}</th>
              <th>{t('Eco-friendliness')}</th>
              <th>{t('Cost')}</th>
              <th>{t('Innovation')}</th>
              <th>{t('Safety')}</th>
              <th>{t('Capacity')}</th>
              <th>{t('maintenanceCost')}</th>
            </>
          ) : (
            <th>{t(activeTab === 'maintenanceCost' ? 'maintenanceCost' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1))}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((data, index) => (
          <tr key={index}>
            <td>{t(data.mode)}</td>
            {activeTab === 'overview' ? (
              <>
                <td>{data.speed}</td>
                <td>{data.comfort}</td>
                <td>{data.eco}</td>
                <td>{data.cost}</td>
                <td>{data.innovation}</td>
                <td>{data.safety}</td>
                <td>{data.capacity}</td>
                <td>{data.maintenanceCost}</td>
              </>
            ) : (
              <td>{data[activeTab]}</td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderChart = () => {
    const dataKey = activeTab === 'overview' ? 'speed' : activeTab;
    const chartData = sortedData.map(item => ({
      name: item.mode,
      value: item[dataKey]
    }));

    const ChartComponent = {
      'bar': BarChart,
      'line': LineChart,
      'pie': PieChart,
      'radar': RadarChart
    }[chartType];

    const DataComponent = {
      'bar': Bar,
      'line': Line,
      'pie': Pie,
      'radar': Radar
    }[chartType];

    return (
      <div ref={chartContainerRef} style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ width: `${chartWidth}px`, height: 400, minWidth: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={chartData}>
              {chartType !== 'pie' && <CartesianGrid strokeDasharray="3 3" />}
              {chartType !== 'pie' && chartType !== 'radar' && <XAxis dataKey="name" tickFormatter={(value) => t(value)} />}
              {chartType !== 'pie' && chartType !== 'radar' && <YAxis />}
              {chartType === 'radar' && (
                <>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" tickFormatter={(value) => t(value)} />
                  <PolarRadiusAxis />
                </>
              )}
              <Tooltip formatter={(value, name) => [value, t(name)]} />
              <Legend formatter={(value) => t(value)} />
              <DataComponent 
                dataKey="value" 
                nameKey="name"
                data={chartData}
                label={chartType === 'pie' ? { fill: 'white', fontSize: 14, formatter: (entry) => t(entry.name) } : null}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                ))}
              </DataComponent>
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="main-title">
        <h1>{t('Hyperloop Interactive Dashboard')}</h1>
      </div>
      
      <div className="tab-buttons">
        {['overview', 'speed', 'comfort', 'eco', 'cost', 'innovation', 'safety', 'capacity', 'maintenanceCost'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSortedData([...transportData]);
              setSortOrder('asc');
            }}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {t(tab === 'overview' ? 'Overview' : tab === 'maintenanceCost' ? 'maintenanceCost' : tab.charAt(0).toUpperCase() + tab.slice(1))}
          </button>
        ))}
      </div>

      <div className="chart-and-table">
        <div className="table-container">
          {renderTable()}
          <Button onClick={handleSort} className="sort-button">
            {sortOrder === 'asc' ? t('Sort Descending') : t('Sort Ascending')}
          </Button>
        </div>
        <div className="chart-container">
          {renderChart()}
          <div className="chart-buttons">
            {['bar', 'line', 'pie', 'radar'].map((type) => (
              <Button 
                key={type} 
                onClick={() => setChartType(type)} 
                className={`chart-type-button ${chartType === type ? 'active' : ''}`}
              >
                {t(type.charAt(0).toUpperCase() + type.slice(1))}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="description">
        <p>
          {t('This')} {t(chartType)} {t('chart shows how Hyperloop compares to other transportation modes')}
          {activeTab !== 'overview' && ` ${t('in terms of')} ${t(activeTab === 'maintenanceCost' ? 'maintenanceCost' : activeTab)}`}.
          {t('Hyperloop excels in almost all categories, offering an unprecedented travel experience.')}
        </p>
      </div>

      <div className="key-advantages">
        <h2>{t('Key Advantages of Hyperloop')}</h2>
        <ul>
          <li>{t('Speed Advantage')}</li>
          <li>{t('Minimal environmental impact thanks to the use of renewable energy')}</li>
          <li>{t('Comfortable and productive travel experience with personalized services')}</li>
          <li>{t('Potential to revitalize the local economy and create new jobs')}</li>
          <li>{t('Seamless integration with other transportation modes for optimized mobility')}</li>
        </ul>
      </div>
    </div>
  );
};

export default HyperloopDashboard;