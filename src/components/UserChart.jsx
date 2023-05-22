import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserChart = ({ users }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const followersPromises = users.map((user) => {
      return fetch(`https://api.github.com/users/${user.login}`)
        .then((response) => response.json())
        .then((data) => {
          return {
            username: user.login,
            followers: data.followers,
          };
        });
    });

    Promise.all(followersPromises)
      .then((results) => {
        const updatedUsers = results.map((result) => {
          return {
            username: result.username,
            followers: result.followers,
          };
        });
        setFollowers(updatedUsers);
        setLoading(false); // Marcar como cargado una vez que se obtienen los datos
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Marcar como cargado incluso en caso de error
      });
  }, [users]);

  // Si se está cargando, mostrar mensaje de carga
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no hay datos de seguidores, mostrar mensaje de no disponibles
  if (followers.length === 0) {
    return <p>No hay datos de seguidores disponibles.</p>;
  }

  const chartData = {
    labels: followers.map((user) => user.username),
    datasets: [
      {
        label: 'Seguidores',
        data: followers.map((user) => user.followers),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className='text-xl font-bold mb-2 text-center'>Seguidores de Usuarios</h2>
      <div style={{ height: '300px', marginTop: '2rem' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default UserChart;


