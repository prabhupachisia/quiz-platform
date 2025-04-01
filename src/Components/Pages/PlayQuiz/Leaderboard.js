import React from "react";
import { useLocation } from "react-router-dom";
import "./Leaderboard.css"; // Import the CSS file for styling

const Leaderboard = () => {
    const location = useLocation();
    const leaderboardData = location.state?.leaderboardData || [];

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th className="table-header">Name</th>
                        <th className="table-header">Email</th>
                        <th className="table-header">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry) => (
                        <tr key={entry.id} className="table-row">
                            <td className="table-data">{entry.userId.name}</td>
                            <td className="table-data">{entry.userId.email}</td>
                            <td className="table-data">{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
