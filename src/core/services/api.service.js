import axios from 'axios';

export const getResult = (input, output) => {
  return axios.post('https://cf12a713.ngrok.io/compare', null, {params: {
    input,
    output
  }})
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}