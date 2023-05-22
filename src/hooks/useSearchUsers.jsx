import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [resetFlag, setResetFlag] = useState(false);
  const navigate = useNavigate();

  const searchUsers = (searchTerm) => {
    if (searchTerm === 'doublevpartners') {
      setError('La búsqueda de "doublevpartners" no está permitida.');
      return;
    }

    if (searchTerm.length < 4) {
      setError('El término de búsqueda debe tener al menos 4 caracteres.');
      return;
    }

    setError('');
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setUsers(data.items.slice(0, 10));
          navigate(`/`);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        setError('Se produjo un error al obtener los usuarios. Inténtelo de nuevo más tarde.');
        console.error(error);
      });
    setResetFlag(false);
  };

  const resetUsers = () => {
    setUsers([]);
    setResetFlag(true);
  };

  return { users, error, resetFlag, searchUsers, resetUsers };
};

export default useSearchUsers;

