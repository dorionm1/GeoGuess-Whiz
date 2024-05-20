import React, { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";

const UserScores = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
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
          setLoading(false); // Set loading to false when user data is fetched
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          setLoading(false); // Set loading to false in case of error
        });
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, []);

  return (
    <div>
      <header>
        {user &&
        <h1>{user?.firstname}'s Scores</h1>
        }
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <ScoreTable data={user.userscore} />
      ) : (
        <div>No user data found</div>
      )}
    </div>
  );
};

export default UserScores;