import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/userService';

const SavedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  fetchUsers()
    .then((data) => {
      setUsers(data);
    });
}, []);

  return (
    <div>
      <h2 className='text-center text-xl'>Usuarios Guardados</h2>
      <table className='centered-table'>
        <thead>
          <tr className='bg-gray-600 text-white'>
            <th>Nombre de Usuario</th>
            <th>ID de Github</th>
            <th>Enlace Github</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.username}</td>
              <td>{user.githubId}</td>
              <td><a href={user.githubUrl} className='github'>Ver en Github</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedUsers;


