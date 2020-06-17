const jobService = require('../services/jobService');
const commandsConfig = require('../../config/commands.json');

module.exports = {
  async index(request, response) {
    const { user_name, text } = request.body;
    let output = null;

    switch (text) {
      case 'job:list:unapproved':
        output = jobService.unapproved();
        break;

      default:
        output = {
          "blocks": [{
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `Hi @${user_name} :wave: what can I do for you?`
            }
          }],
          "attachments": commandsConfig
        };
        break;
    }

    response.send(output);
  },
};
