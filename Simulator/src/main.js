import * as dotenv from 'dotenv';
import fetch from 'node-fetch-retry';
import { getRequestObj } from './utils';
import { observablePropierties } from './data/observableProperties';
import { sensors } from './data/sensors';
import seedDatabase from './seedDatabase';
import sensorSimulator from './sensorSimulator';

dotenv.config();

const host = process.env.SERVICE_GATEWAY_HOST;
const port = process.env.SERVICE_GATEWAY_PORT;
const protocol = process.env.SERVICE_GATEWAY_PROTOCOL;

const urlCatalogObservables = `${protocol}://${host}:${port}/api/catalog/observables`;
const urlCatalogSensors = `${protocol}://${host}:${port}/api/catalog/sensors`;
const urlDataSensors = `${protocol}://${host}:${port}/api/sensors`;

const simulator = async () => {
  const observablePropertiesRes = await fetch(urlCatalogObservables, getRequestObj());
  let observablePropiertiesData = await observablePropertiesRes.json();

  if (!observablePropiertiesData || !observablePropiertiesData.length)
    observablePropiertiesData = await seedDatabase(observablePropierties, urlCatalogObservables);

  const sensorsRes = await fetch(urlCatalogSensors, getRequestObj());
  let sensorsData = await sensorsRes.json();

  if (!sensorsData || !sensorsData.length)
    sensorsData = await seedDatabase(sensors, urlCatalogSensors, {
      name: 'observables',
      values: observablePropiertiesData.map(({ _id }) => _id)
    });

  console.log('\n###############################################################');
  console.log('Starting Sensor simulator');
  console.log('###############################################################\n');

  await sensorSimulator(sensorsData, urlDataSensors);
};

simulator();
