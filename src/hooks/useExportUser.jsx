import axios from 'axios';
import Swal from 'sweetalert2';

const useExportUser = (user) => {

  const exportUser = () => {
    const userData = {
      username: user.login,
      githubId: user.id,
      githubUrl: user.html_url,
    };

    axios.post('http://localhost:3000/users', userData)
      .then((response) => {
        console.log(response.data);
        Swal.fire('Éxito', 'La data se exportó correctamente.', 'success');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return exportUser;
};

export default useExportUser;