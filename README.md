# README

Slack Error Handler

- Send Slack notifications with zero dependencies.

## Instalation

- `yarn add send-slack-error`

or via npm

- `npm install send-slack-error`

## USE

```javascript
import {sendSlackError} from 'send-slack-error';

// Error handling

try {
  throw new Error('throw new braba');
} catch (error) {
  sendSlackError(error);
}
```

## CONFIGURATION

Configure your env vars:

```env
  NODE_ENV=production # default: "development"
  APP_NAME=my_app
  SLACK_ENABLED=true  # default: true
  SLACK_URL=<your_slack_channel_url_string> # Required
  SLACK_CHANNEL=general  # default: general
```


## Slack notification colors by NODE_ENV:
- NODE_ENV=production: danger (red)
- NODE_ENV=staging: warning (yello)
- NODE_ENV=development: good (green)