import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles.css';

const COLORS = ['#66BB6A', '#EF5350', '#42A5F5', '#FFA726', '#9CCC65', '#FF7043', '#5C6BC0', '#FFD54F'];

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getChartData = (data, key) => {
    const counts = {};
    data.forEach((item) => {
        const value = item[key];
        counts[value] = (counts[value] || 0) + 1;
    });

    return Object.keys(counts).map((value, index) => ({ name: value, value: counts[value], fill: COLORS[index] }));
};

const getSuccessFailureData = (data) => {
    const successCount = data.filter((item) => item.successful).length;
    const failureCount = data.length - successCount;

    return [
        { name: 'Success', value: successCount, fill: COLORS[0] },
        { name: 'Failure', value: failureCount, fill: COLORS[1] },
    ];
};

const LoadingIndicator = () => <div>Loading...</div>;

const ChartContainer = ({ title, children }) => (
    <div className="chart-container" style={{ margin: '10px', flex: '1 1 100%', maxWidth: '400px' }}>
        <h3>{title}</h3>
        {children}
    </div>
);

const Chart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchData('https://www.ag-grid.com/example-assets/space-mission-data.json')
            .then((data) => {
                const successFailureData = getSuccessFailureData(data);
                const launchCompaniesData = getChartData(data, 'launch_company');
                const rocketTypesData = getChartData(data, 'rocket');

                setChartData({ successFailureData, launchCompaniesData, rocketTypesData });
            })
            .catch(() => setChartData([]));
    }, []);

    if (!chartData || Object.keys(chartData).length === 0) {
        return <LoadingIndicator />;
    }

    return (
        <div className="container">
            <h2>Mission Distribution Charts</h2>
            <div className="container-chart" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <ChartContainer title="Success/Failure Chart">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={chartData.successFailureData}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {chartData.successFailureData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ChartContainer>

                <ChartContainer title="Rocket Types Distribution">
                    <BarChart width={400} height={300} data={chartData.rocketTypesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
};

export default Chart;
