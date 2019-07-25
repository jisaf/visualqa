import axios from 'axios';

export const getResult = (input, output) => {
  return axios.post('https://fcd2459a.ngrok.io/url2', null, {params: {
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