import { Sequelize } from 'sequelize';

export const getQuery = (time) => {
  const query = {
    attributes: {
      include: [
        [Sequelize.fn('AVG', Sequelize.col('value')), 'valueAverage'],
        [Sequelize.fn('date_part', 'year', Sequelize.col('createdAt')), 'year'],
        [Sequelize.fn('date_part', time, Sequelize.col('createdAt')), time]
      ],
      exclude: ['updatedAt', 'observableProperty', 'id', 'unit', 'value', 'createdAt']
    },
    group: [
      'esn',
      Sequelize.fn('date_trunc', 'year', Sequelize.col('createdAt')),
      'year',
      Sequelize.fn('date_trunc', time, Sequelize.col('createdAt')),
      time
    ]
  };

  if (time === 'day') {
    query.attributes.include.push([
      Sequelize.fn('date_part', 'month', Sequelize.col('createdAt')),
      'month'
    ]);
    query.group.push(Sequelize.fn('date_trunc', 'month', Sequelize.col('createdAt')), 'month');
  }

  return query;
};
