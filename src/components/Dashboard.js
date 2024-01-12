import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles.css';

const BooleanCellRenderer = ({ value }) => <span>{value ? 'Yes' : 'No'}</span>;

const Dashboard = () => {
    const [missionData, setMissionData] = useState([]);

    useEffect(() => {
        // Fetch data from the provided JSON link
        fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
            .then((response) => response.json())
            .then((data) => {
                setMissionData(data);
            });
    }, []);

    const columnDefs = [
        { headerName: 'Mission Name', field: 'mission' },
        { headerName: 'Launch Company', field: 'company' },
        { headerName: 'Location', field: 'location' },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Time', field: 'time' },
        { headerName: 'Rocket', field: 'rocket' },
        { headerName: 'Price', field: 'price' },
        { headerName: 'Successful', field: 'successful', cellRenderer: 'booleanCellRenderer' },
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1,
    };

    const gridOptions = {
        columnDefs,
        defaultColDef,
        pagination: true,
        paginationPageSize: 10,
        frameworkComponents: {
            booleanCellRenderer: BooleanCellRenderer,
        },
    };

    return (
        <div className="container">
            <div className="table-container ag-theme-alpine">
                <h3>Mission Data Table</h3>
                {missionData.length > 0 ? (
                    <AgGridReact gridOptions={gridOptions} rowData={missionData} />
                ) : (
                    <LoadingIndicator />
                )}
            </div>
        </div>
    );
};

const LoadingIndicator = () => <p>Loading data...</p>;

export default Dashboard;
