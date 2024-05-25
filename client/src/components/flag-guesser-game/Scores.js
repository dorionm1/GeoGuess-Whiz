import React, { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";
import { useTranslation } from 'react-i18next';

const UserScores = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const {t} = useTranslation();

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
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <header>
        {user &&
        <h1 id="score-title">{user?.firstname}'s {t('scoresLink')}</h1>
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