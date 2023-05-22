import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';


const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  if (!user) {
    return <p>Cargando...</p>;
  }

    const handleGoBack = () => {
    navigate('/');
  };

  const handleExportar = () => {
  const userData = {
    username: user.login,
    githubId: user.id,
    githubUrl: user.html_url,
  };

  axios.post('http://localhost:3000/users', userData)
    .then((response) => {
      console.log(response.data);
      // Aquí puedes realizar alguna acción adicional, como mostrar un mensaje de éxito.
    })
    .catch((error) => {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error.
    });
};


  return (
    <div className='bg-slate-300 flex flex-col items-center justify-center shadow-lg shadow-slate-500/50 rounded-lg p-5 mx-auto w-1/2 mt-4'>
      <h2 className="text-xl font-bold mb-2">Perfil de Usuario: {user.login}</h2>
      <img src={user.avatar_url} alt={user.login} className="w-32 h-32 rounded-full mb-2" />
      <p>
        <strong>Nombre:</strong> {user.name || 'No disponible'}
      </p>
      <p>
        <strong>Ubicación:</strong> {user.location || 'No disponible'}
      </p>
      <p>
        <strong>Seguidores:</strong> {user.followers}
      </p>
      <p>
        <strong>Siguiendo:</strong> {user.following}
      </p>
      <a href={user.html_url}><AiFillGithub className='text-2xl'/></a>
      <div className='flex gap-5'>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={handleGoBack}>
          Regresar
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4" onClick={handleExportar}>
          Exportar
        </button>
      </div>

    </div>
  );
};

export default UserProfile;
