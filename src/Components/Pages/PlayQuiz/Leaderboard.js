import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Leaderboard.css";

const Leaderboard = () => {
    const results = useSelector((state) => state.reducer.leaderboard);
    const [sortedResults, setSortedResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Sort users by score (higher is better) and then by time (lower is better)
        const sorted = [...results].sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.timeTaken - b.timeTaken;
        });
        setSortedResults(sorted);
    }, [results]);

    return (
        <div className="leaderboard-container">
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Time Taken (s)</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedResults.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.score}</td>
                            <td>{user.timeTaken}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
};

export default Leaderboard;
