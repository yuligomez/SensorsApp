export class Service {
  constructor({ services }) {
    this.services = services;
  }

  getService = (service) => {
    return this.services[service];
  };

  getUri = (service) => {
    const { host = '', port = '', protocol = '' } = this.getService(service) || {};

    if (!host || !port || !protocol) return '';

    return `${protocol}://${host}:${port}/api/external`;
  };
}
