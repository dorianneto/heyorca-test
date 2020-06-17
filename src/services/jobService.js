const database = require('../../jobs.json');
const formatDate = require('./formatDate');

module.exports = {
  approve(id) {
    let output = this.detail(id);

    output.blocks.splice(-1, 1);
    output.attachments = [{
      "color": "#2ecc71",
      "text": ":heavy_check_mark: Job approved!",
      "footer": "HeyOrca API",
      "footer_icon": "https://heyorca.com/wp-content/uploads/2016/02/cropped-Logo-square-32x32.png"
    }];

    return output;
  },
  reject(id) {
    let output = this.detail(id);

    output.blocks.splice(-1, 1);
    output.attachments = [{
      "color": "#e74c3c",
      "text": ":x: Job rejected!",
      "footer": "HeyOrca API",
      "footer_icon": "https://heyorca.com/wp-content/uploads/2016/02/cropped-Logo-square-32x32.png"
    }];

    return output;
  },
  unapproved() {
    const output = {
      "blocks": [{
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":wave: I found *3 unapproved jobs* waiting for your review:"
          }
        },
        {
          "type": "divider"
        }
      ]
    };

    database.map(job => {
      const deadlineFormatted = formatDate(job.deadline);

      output.blocks.push({
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*<${job.link}|${job.name}>*\n${job.description}.`
        },
        "accessory": {
          "type": "image",
          "image_url": job.thumbnail,
          "alt_text": job.name
        }
      });

      output.blocks.push({
        "type": "context",
        "elements": [{
            "type": "image",
            "image_url": "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png",
            "alt_text": "Calendar Icon"
          },
          {
            "type": "plain_text",
            "emoji": true,
            "text": `Deadline: ${deadlineFormatted}`
          }
        ]
      });

      output.blocks.push({
        "type": "actions",
        "elements": [{
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "More details",
            "emoji": true
          },
          "action_id": "job:action:detail",
          "value": `${job.id}`
        }]
      });

      output.blocks.push({
        "type": "divider"
      });
    });

    output.blocks.splice(-1, 1);

    return output;
  },
  detail(id) {
    const job = database.filter(item => item.id == id)[0];
    const deadlineFormatted = formatDate(job.deadline);

    const output = {
      "blocks": [{
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `:eyes: Job details from *<${job.link}|${job.name}>*`
          }
        }
      ]
    };

    output.blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Source:*\n${job.source}\n*Deadline:*\n${deadlineFormatted}\n*Description:* ${job.description}`
      },
      "accessory": {
        "type": "image",
        "image_url": job.thumbnail,
        "alt_text": job.name
      }
    });

    output.blocks.push({
      "type": "actions",
      "elements": [{
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Approve"
          },
          "style": "primary",
          "action_id": "job:action:approve",
          "value": `${job.id}`
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Reject"
          },
          "style": "danger",
          "action_id": "job:action:reject",
          "value": `${job.id}`
        }
      ]
    });

    return output;
  },
};
