import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Lista de Usuarios</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.login}`} className="text-blue-500 hover:underline">
                {user.login}
              </Link>
              <span className="text-gray-500"> (ID: {user.id})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default UserList;

