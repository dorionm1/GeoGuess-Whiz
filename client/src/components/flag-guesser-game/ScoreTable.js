import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import '../../styling/App.css';

const ScoreTable = ({ data }) => {
    const [user, setUser] = useState(null);
    const storedToken = localStorage.getItem('token');

    const {t} = useTranslation();

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
        <div className="table-container">
            <table id="score-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} id="score-table-column-header">
                                {column === "createddate" ? t('dateTaken') : t('score')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex} className={column}>
                                    {column === "createddate"
                                        ? new Date(row[column]).toLocaleString()
                                        : column === "score"
                                        ? `${row[column]}%`
                                        : row[column]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
</div>
    );
};

export default ScoreTable;
