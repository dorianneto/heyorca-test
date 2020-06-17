const axios = require('axios');

const jobService = require('../services/jobService');

module.exports = {
  async listen(request, response) {
    const { response_url, actions } = JSON.parse(request.body.payload);

    switch (actions[0].action_id) {
      case 'job:action:detail':
        await axios.post(response_url, jobService.detail(actions[0].value));
        break;
      case 'job:action:approve':
        await axios.post(response_url, jobService.approve(actions[0].value));
        break;
      case 'job:action:reject':
        await axios.post(response_url, jobService.reject(actions[0].value));
      break;
    }
  },
};
