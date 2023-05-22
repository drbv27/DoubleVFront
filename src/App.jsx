import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link,Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import SearchForm from './components/SearchForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import UserChart from './components/UserChart';
import { AiFillGithub,AiFillHome } from 'react-icons/ai';
import SavedUsers from './components/SavedUsers';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [resetFlag, setResetFlag] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm === 'doublevpartners') {
      Swal.fire('Error', 'La búsqueda de "doublevpartners" no está permitida.', 'error');
      return;
    }

    if (searchTerm.length < 4) {
      Swal.fire('Error', 'El término de búsqueda debe tener al menos 4 caracteres.', 'error');
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

  const handleReset = () => {
    setUsers([]);
    setResetFlag(true);
  };

  console.log(users);

  return (
    <div className='bg-slate-100 shadow-lg shadow-slate-500/50 rounded-lg border m-5'>
      <h1 className='text-3xl font-bold text-center mt-2'>Aplicación de búsqueda de usuarios de GitHub</h1>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SearchForm onSearch={handleSearch} onReset={handleReset} resetFlag={resetFlag}/>
              <div className='flex flex-col sm:flex-row justify-center gap-20 mx-10'>
                <UserList users={users} />
                <div className='w-full sm:w-2/3'>
                  <div className='max-w-sm mx-auto'>
                    <UserChart users={users} />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/saved-users" element={<SavedUsers />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>

      {location.pathname === "/"
      ?
        <div className='mt-2 flex justify-center'>
          <Link to="/saved-users">
            <button className='bg-slate-800 text-white px-2 rounded'>Ver Usuarios Guardados</button>
          </Link>
        </div>
      :
        <div className='mt-6 flex justify-center text-xl'>
          <Link to="/">
            <button><AiFillHome/></button>
          </Link>
        </div>
    }

      <div className='mt-4 pb-2 flex justify-center'>
       By: <a href="https://github.com/drbv27" className='flex items-center'>Diego Bonilla<AiFillGithub/></a>
      </div>
    </div>
  );
};

export default App;




