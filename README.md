# README

Slack Error Handler

- Send Slack notifications with zero dependencies.

## Instalation

- `yarn add send-slack-error`

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
  APP_NAME="Example app"  # default: 'CHANGE_ME'
  NODE_ENV="production"   # default: "development"
  SLACK_ENABLED = true  # default: true
  SLACK_URL = <your_slack_channel_url_string> # Required
  SLACK_CHANNEL = 'general'  # default: general
```
