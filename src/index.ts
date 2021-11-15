import {request, RequestOptions} from 'https';
import {URL} from 'url';

export default async function sendSlackError(err: Error): Promise<void> {
  console.error(err);
  try {
    const {
      npm_package_name,
      NODE_ENV = 'development',
      SLACK_CHANNEL = 'errors',
      SLACK_ENABLED = 'true',
    } = process.env;

    if (SLACK_ENABLED !== 'true') {
      return;
    }

    let color = 'good';
    switch (NODE_ENV) {
      case 'production':
        color = 'danger';
        break;
      case 'homologation':
        color = 'warning';
        break;
    }

    const attachment = {
      fallback: err.message,
      title: err.message,
      pretext: `${npm_package_name} (${NODE_ENV})`,
      //   title_link:
      //     'https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups',
      text: err.stack !== undefined ? err.stack : err.message,
      color,
    };

    const params = {
      // text: npm_package_name,
      text: `${npm_package_name}: ${err.message}`,
      icon_emoji: 'warning',
      channel: SLACK_CHANNEL,
      attachments: [attachment],
    };
    await makePostRequest(params);
  } catch (error) {
    console.error(err);
  }
}

function makePostRequest(data: unknown) {
  return new Promise((resolve, reject) => {
    const {SLACK_URL = 'CHANGE_ME'} = process.env;
    if (SLACK_URL === 'CHANGE_ME') {
      throw new Error('Please configure SLACK_URL env variable.');
    }
    const body = JSON.stringify(data);
    const {hostname, pathname} = new URL(SLACK_URL);
    const options: RequestOptions = {
      hostname,
      path: pathname,
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'x-www-form-urlencoded',
        'Content-Length': body.length,
      },
    };
    const req = request(options, res => {
      //   res.on('data', (d) => {
      //     process.stdout.write(d);
      //   });
      resolve(true);
    });
    req.on('error', error => reject(error));
    req.on('timeout', () => reject('TIMEOUT'));
    req.write(body);
    req.end();
  });
}
