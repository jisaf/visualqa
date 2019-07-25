import axios from 'axios';

export const getResult = (input, output) => {
  return axios.post('https://d05ca28e.ngrok.io/compare', null, {params: {
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