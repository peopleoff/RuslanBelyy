import axios from 'axios'

export default {

  sendEmail(params) {
    axios.post('https://formcarry.com/s/N6E9mkO26Vc', params)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  },
}