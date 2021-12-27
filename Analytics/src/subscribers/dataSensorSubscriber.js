import fetch from 'node-fetch-retry';
import { Subscriber } from '../lib';

export default async (container) => {
  const cache = container.get('Cache');
  const emailSender = container.get('EmailSender');
  const httpService = container.get('Service');
  const emailService = container.get('EmailService');
  const subscriber = new Subscriber('data-sensors', container.get('Config'));

  subscriber.subscribe(async (message) => {
    const dataSensor = JSON.parse(message);
    const { observableProperty, value } = dataSensor;

    if (!cache.has(observableProperty)) {
      const catalogUri = httpService.getUri('catalog');
      const response = await fetch(`${catalogUri}?name=${observableProperty}`, {
        method: 'GET',
        retry: 3,
        pause: 1000,
        callback: (retry) => {
          console.log(`Trying: ${retry}`);
        }
      });
      const { name, minValue, maxValue } = await response.json();

      cache.add(name, { minValue, maxValue });
    }

    const { minValue, maxValue } = cache.get(observableProperty);

    if (value < minValue || value > maxValue) {
      console.log('ALERT: Sending alert email');

      const mails = await emailService.find({});
      emailSender.send(
        dataSensor,
        mails.map((m) => m.email)
      );
    }
  });
};
