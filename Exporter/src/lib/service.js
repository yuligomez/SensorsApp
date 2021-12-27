export class Service {
  constructor({ services }) {
    this.services = services;
  }

  getService = (service) => {
    return this.services[service];
  };

  getUri = (service) => {
    const { endpoint, host, port, protocol } = this.getService(service);

    return `${protocol}://${host}:${port}/api/internal/${endpoint}`;
  };
}
