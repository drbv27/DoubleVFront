import axios from 'axios';

export const fetchUsers = () => {
  return axios
    .get('http://localhost:3000/users')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
