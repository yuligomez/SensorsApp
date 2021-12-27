import fetch from 'node-fetch-retry';
import { getRandomInteger, getRequestObj, timer } from './utils';

const seedDatabase = async (data, uri, relation = null) => {
  const results = [];

  for (let i = 0; i < data.length; i++) {
    let dataPost = data[i];

    if (relation) {
      const { name, values } = relation;

      dataPost = {
        ...data[i],
        [name]: !values[i] ? values : [values[i]]
      };
    }

    // console.log('URI: ', uri);
    // console.log('asdasdasd: ', getRequestObj('POST', dataPost));

    const response = await fetch(uri, getRequestObj('POST', dataPost));

    const result = await response.json();

    results.push(result);
    console.log(result);

    await timer(getRandomInteger(1000, 2000));
  }

  return results;
};

export default seedDatabase;
