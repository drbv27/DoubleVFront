import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ users }) => {
  const followersData = {
    labels: users.map((user) => user.login),
    datasets: [
      {
        label: 'Seguidores',
        data: users.map((user) => user.followers),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Gráfico de Seguidores</h2>
      {users.length > 0 ? (
        <Bar data={followersData} />
      ) : (
        <p>No hay datos de usuarios para mostrar.</p>
      )}
    </div>
  );
};

export default Chart;
