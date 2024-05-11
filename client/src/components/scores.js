import React from "react";
import { useEffect, useState } from "react";

const UserScores = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUsername = sessionStorage.getItem('authenticatedUser');
      if (storedUsername) {
        fetch(`/get-user/${encodeURIComponent(storedUsername)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setUser(data.user);
            console.log(user?.firstname)
          })
          .catch(error => {
            console.error('Error fetching user:', error);
          });
      }
    }, [user?.firstname]);

    return (
        <div>
            <header>
                <h1>{user?.firstname}'s Scores</h1>
            </header>
            {/* <main>
                <table>
                <thead>
                    <tr>
                    <th>Game Type</th>
                    <th>Total Time</th>
                    <th>Score</th>
                    <th>Best Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                    <tr key={index}>
                        <td>{score.gameType}</td>
                        <td>{score.totalTime}</td>
                        <td>{score.score}</td>
                        <td>{score.bestScore}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </main> */}
        </div>
    );
};

export default UserScores;