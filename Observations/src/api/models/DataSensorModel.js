import { DataTypes } from 'sequelize';

export default class DataSensorModel {
  #model = null;

  constructor(driver) {
    this.#model = driver.define(
      'DataSensor',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        esn: {
          type: DataTypes.STRING,
          allowNull: false
        },
        observableProperty: {
          type: DataTypes.STRING,
          allowNull: false
        },
        unit: {
          type: DataTypes.STRING,
          allowNull: false
        },
        value: {
          type: DataTypes.FLOAT,
          allowNull: false
        }
      },

      {
        timestamps: true
      }
    );

    return this.#model;
  }
}
