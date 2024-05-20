import React, { useEffect, useState } from "react";
import "../App.css"

const ScoreTable = ({ data }) => {
    const [user, setUser] = useState(null);
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        if (storedToken) {
            fetch("/get-user", {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data.user);
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
        }
    }, [storedToken]);

    if (!user || !user.userscore) {
        return null;
    }

    const columns = ["createddate", "score"];

    return (
        <table>
            <thead>
                <tr>
                    {/* Render column headers */}
                    {columns.map((column, index) => (
                        <th key={index}>
                            {column === "createddate" ? "Date Taken" : column.charAt(0).toUpperCase() + column.slice(1)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* Render table rows */}
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {/* Render cells for each row */}
                        {columns.map((column, columnIndex) => (
                            <td key={columnIndex} className={column}>
                                {/* Format the date and render the score */}
                                {column === "createddate" ? new Date(row[column]).toLocaleString() : row[column]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ScoreTable;
