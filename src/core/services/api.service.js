import axios from 'axios';

export const getResult = (input, output) => {
  return axios.post('http://cf12a713.ngrok.io:4000/compare', null, {params: {
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