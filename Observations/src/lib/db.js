import Sequelize from 'sequelize';

export const connect = ({ db_user, db_name, db_password }) =>
  new Sequelize(db_name, db_user, db_password, {
    host: 'localhost',
    dialect: 'postgres'
  });
