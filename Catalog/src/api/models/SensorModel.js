import { model, Schema } from 'mongoose';

const SensorSchema = new Schema(
  {
    model: { type: String, required: true },
    name: { type: String, required: true },
    esn: { type: String, unique: true, required: true, dropDups: true },
    lat: { type: String, required: true },
    long: { type: String, required: true },
    token: { type: String, required: true },
    observables: [{ type: Schema.Types.ObjectId, ref: 'Observable' }]
  },
  {
    timestamps: true
  }
);

export default model('Sensor', SensorSchema);
